type IconName =
  | "home"
  | "globe"
  | "feed"
  | "user"
  | "grid"
  | "bell"
  | "search"
  | "pin"
  | "star"
  | "heart"
  | "arrow-up-right"
  | "chevron-right"
  | "chevron-left"
  | "close"
  | "back"
  | "plus"
  | "bolt"
  | "link"
  | "chip"
  | "trophy"
  | "doc"
  | "code"
  | "shield"
  | "lock"
  | "question"
  | "speaker"
  | "drop"
  | "magnifier"
  | "scan"
  | "compass"
  | "rocket"
  | "phone"
  | "palette"
  | "coin"
  | "paper";

const paths: Record<IconName, string> = {
  home:
    "M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 0c2.5-2.5 4-5.6 4-9s-1.5-6.5-4-9c-2.5 2.5-4 5.6-4 9s1.5 6.5 4 9zM3 12h18",
  feed:
    "M4 5h16M4 12h16M4 19h10",
  user:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 1 1 14 0",
  grid:
    "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  bell:
    "M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15L6 16zM10 20a2 2 0 0 0 4 0",
  search:
    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  pin:
    "M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  star:
    "M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3 9.4l6.1-.9L12 3z",
  heart:
    "M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7 4.5C19 16.5 12 21 12 21z",
  "arrow-up-right":
    "M7 17 17 7M9 7h8v8",
  "chevron-right":
    "M9 6l6 6-6 6",
  "chevron-left":
    "M15 6l-6 6 6 6",
  close: "M6 6l12 12M18 6 6 18",
  back: "M19 12H5M12 19l-7-7 7-7",
  plus: "M12 5v14M5 12h14",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  link:
    "M10 14a5 5 0 0 1 0-7l3-3a5 5 0 0 1 7 7l-1.5 1.5M14 10a5 5 0 0 1 0 7l-3 3a5 5 0 0 1-7-7l1.5-1.5",
  chip:
    "M6 4h12v16H6zM9 8h6M9 12h6M9 16h6",
  trophy:
    "M7 4h10v4a5 5 0 0 1-10 0V4zM5 4h2v3a2 2 0 0 1-2-2V4zM17 4h2v1a2 2 0 0 1-2 2V4zM10 13v4M14 13v4M8 20h8",
  doc:
    "M6 3h9l4 4v14H6V3zM14 3v5h5",
  code:
    "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  shield: "M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3z",
  lock:
    "M6 11h12v10H6zM9 11V8a3 3 0 0 1 6 0v3",
  question:
    "M9 9a3 3 0 1 1 4.5 2.6c-1 .6-1.5 1.2-1.5 2.4M12 18v.1",
  speaker:
    "M4 10v4h4l5 4V6L8 10H4zM16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14",
  drop:
    "M12 3s-7 7-7 12a7 7 0 1 0 14 0c0-5-7-12-7-12z",
  magnifier:
    "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  scan:
    "M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M4 17v2a1 1 0 0 0 1 1h2M17 20h2a1 1 0 0 0 1-1v-2M8 8h8v8H8z",
  compass:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15 9l-4 2-2 4 4-2 2-4z",
  rocket:
    "M14 4c4 0 6 2 6 6-2 0-3 1-5 3l-3-3c2-2 3-3 2-6zM5 19l3-3M9 15l-4 4 .5-3.5L9 15z",
  phone:
    "M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
  palette:
    "M12 3a9 9 0 1 0 0 18 3 3 0 0 0 3-3 2 2 0 0 1 2-2h2a3 3 0 0 0 3-3 9 9 0 0 0-10-10zM7 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM10 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM16 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  coin:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v8M9 11h6",
  paper:
    "M5 4h11l3 3v13H5V4zM9 9h7M9 13h7M9 17h5",
};

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.6,
  fill = "none",
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}

export type { IconName };
