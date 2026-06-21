export default function Monogram({
  text,
  size = 44,
  grad = "linear-gradient(135deg,#6b2fdd,#e060ff)",
  rounded = "12px",
  className = "",
}: {
  text: string;
  size?: number;
  grad?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center text-white font-black flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: grad,
        borderRadius: rounded,
        fontSize: size * 0.36,
        letterSpacing: "-0.02em",
      }}
    >
      {text}
    </div>
  );
}
