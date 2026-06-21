const stars = [
  { top: "8%", left: "18%", size: 3, delay: "0s" },
  { top: "12%", left: "65%", size: 2, delay: "0.5s" },
  { top: "25%", left: "88%", size: 2, delay: "1s" },
  { top: "18%", left: "35%", size: 3, delay: "0.3s" },
  { top: "78%", left: "12%", size: 2, delay: "1.5s" },
  { top: "88%", left: "75%", size: 3, delay: "0.7s" },
  { top: "92%", left: "42%", size: 2, delay: "2s" },
  { top: "5%", left: "80%", size: 2, delay: "1.2s" },
  { top: "55%", left: "8%", size: 2, delay: "1.8s" },
  { top: "65%", left: "92%", size: 3, delay: "0.4s" },
];

export default function Stars() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
