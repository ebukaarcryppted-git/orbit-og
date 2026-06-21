import Link from "next/link";
import Icon from "@/components/Icon";

export default function ScreenHeader({
  title,
  eyebrow,
  back = false,
  right,
}: {
  title: string;
  eyebrow?: string;
  back?: boolean;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-5 pt-7 pb-2 flex items-start justify-between animate-fade-up">
      <div className="flex items-center gap-3">
        {back && (
          <Link
            href="/home"
            className="press w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink"
            aria-label="Back"
          >
            <Icon name="back" size={17} strokeWidth={1.8} />
          </Link>
        )}
        <div>
          {eyebrow && (
            <span className="eyebrow mb-2">{eyebrow}</span>
          )}
          <h1 className="text-[26px] font-extrabold tracking-tightest text-ink leading-none mt-1">
            {title}
          </h1>
        </div>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}
