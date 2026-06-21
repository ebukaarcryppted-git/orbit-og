import { NextResponse } from "next/server";
import { parseHumanDate } from "@/lib/relativeTime";

const BLOG_INDEX = "https://0g.ai/blog";

export const revalidate = 600; // 10 minutes ISR

type FeedPost = {
  id: string;
  source: "blog";
  sourceLabel: "Blog Post";
  sourceHandle: "0g.ai/blog";
  title: string;
  slug: string;
  date: string;       // ISO YYYY-MM-DD
  dateLabel: string;  // "Jun 17, 2026" as it appears on the site
  externalUrl: string;
};

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

function parseBlogList(html: string): FeedPost[] {
  const slugRe = /href="\/blog\/([a-z0-9-]+)"[\s\S]{0,3500}?<\/a>/g;
  const out: FeedPost[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = slugRe.exec(html)) !== null) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    const block = m[0];
    const dateMatch = block.match(
      /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* ?(\d{1,2}),? ?(20\d{2})/,
    );
    const titleMatch = block.match(/<h[23][^>]*>([^<]+)<\/h[23]>/);
    if (!titleMatch) continue;
    const dateLabel = dateMatch ? dateMatch[0] : "";
    const iso = dateLabel ? (parseHumanDate(dateLabel) || "") : "";
    if (!iso) continue;
    out.push({
      id: slug,
      slug,
      source: "blog",
      sourceLabel: "Blog Post",
      sourceHandle: "0g.ai/blog",
      title: decode(titleMatch[1]).trim(),
      date: iso,
      dateLabel,
      externalUrl: `https://0g.ai/blog/${slug}`,
    });
    if (out.length >= 16) break;
  }
  return out;
}

export async function GET() {
  try {
    const res = await fetch(BLOG_INDEX, {
      headers: { "User-Agent": "Mozilla/5.0 OrbitOG/1.0" },
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`blog HTTP ${res.status}`);
    const html = await res.text();
    const posts = parseBlogList(html);
    return NextResponse.json(
      { ok: true, count: posts.length, posts, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=600` } },
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "fetch failed" },
      { status: 502 },
    );
  }
}
