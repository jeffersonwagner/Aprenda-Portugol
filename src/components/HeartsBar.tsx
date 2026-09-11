interface HeartsBarProps {
  hearts: number;
  maxHearts: number;
}

export default function HeartsBar({ hearts, maxHearts }: HeartsBarProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`${hearts} corações restantes`}>
      {Array.from({ length: maxHearts }, (_, i) => (
        <span key={i} className="text-lg" aria-hidden>
          {i < hearts ? "❤️" : "🖤"}
        </span>
      ))}
    </div>
  );
}
