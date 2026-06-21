import { NextResponse } from "next/server";
import { parseHumanDate } from "@/lib/relativeTime";

export const revalidate = 600;

function decode(s: string): string {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripTags(s: string): string {
  return decode(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function extractMetaContent(html: string, key: string): string | null {
  // Accept either order:  <meta content="X" property="og:title"/>  or  <meta property="og:title" content="X"/>
  const propFirst = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const contentFirst = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
    "i",
  );
  const m = html.match(propFirst) || html.match(contentFirst);
  return m ? decode(m[1]) : null;
}

function extractBody(html: string): string[] {
  // Webflow wraps post body inside a rich-text div; scope first to the article container if possible.
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const rich = html.match(/class="[^"]*(rich-text|w-richtext|blog-post-rich|prose)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|section)>/i);
  const scope = article ? article[1] : rich ? rich[2] : html;
  const paras: string[] = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(scope)) !== null) {
    const txt = stripTags(m[1]);
    if (!txt) continue;
    if (txt.length < 20 && /^[\s\W]*$/.test(txt)) continue;
    if (paras[paras.length - 1] === txt) continue;
    paras.push(txt);
    if (paras.length >= 14) break;
  }
  return paras;
}

function dateNearH1(html: string): string | null {
  const h1Idx = html.search(/<h1[^>]*>/i);
  if (h1Idx < 0) return null;
  // Scan a 4KB window around the H1 for the canonical date
  const start = Math.max(0, h1Idx - 2000);
  const end = Math.min(html.length, h1Idx + 4000);
  const slice = html.slice(start, end);
  const m = slice.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* ?(\d{1,2}),? ?(20\d{2})/);
  return m ? m[0] : null;
}

export async function GET(
  _req: Request,
  ctx: { params: { slug: string } },
) {
  const slug = ctx.params.slug;
  if (!/^[a-z0-9-]{3,80}$/.test(slug)) {
    return NextResponse.json({ ok: false, error: "bad slug" }, { status: 400 });
  }
  try {
    const res = await fetch(`https://0g.ai/blog/${slug}`, {
      headers: { "User-Agent": "Mozilla/5.0 OrbitOG/1.0" },
      next: { revalidate },
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    }
    const html = await res.text();

    const ogTitle = extractMetaContent(html, "og:title") || extractMetaContent(html, "twitter:title");
    const summary = extractMetaContent(html, "og:description") || extractMetaContent(html, "twitter:description") || "";
    // Strip the " | 0G" suffix Webflow adds
    const title = ogTitle ? ogTitle.replace(/\s*\|\s*0G\s*$/i, "").trim() : slug;

    const dateRaw = dateNearH1(html);
    const date = dateRaw ? parseHumanDate(dateRaw) : null;

    const body = extractBody(html);

    return NextResponse.json(
      {
        ok: true,
        slug,
        source: "blog",
        sourceLabel: "Blog Post",
        sourceHandle: "0g.ai/blog",
        title,
        summary,
        date,
        dateLabel: dateRaw,
        body,
        externalUrl: `https://0g.ai/blog/${slug}`,
      },
      { headers: { "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=600` } },
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "fetch failed" },
      { status: 502 },
    );
  }
}
