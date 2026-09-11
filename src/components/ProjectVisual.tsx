const TONES = [
  { from: "#d8d8d8", to: "#efefef", angle: 135 },
  { from: "#c9c9c9", to: "#e9e9e9", angle: 115 },
  { from: "#dedede", to: "#f4f4f4", angle: 160 },
  { from: "#cfcfcf", to: "#ececec", angle: 100 },
  { from: "#e2e2e2", to: "#f6f6f6", angle: 145 },
];

interface ProjectVisualProps {
  tone: number;
  label?: string;
  className?: string;
  ratio?: string;
}

export default function ProjectVisual({
  tone,
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: ProjectVisualProps) {
  const t = TONES[tone % TONES.length];

  return (
    <div
      className={`relative w-full overflow-hidden ${ratio} ${className}`}
      style={{
        background: `linear-gradient(${t.angle}deg, ${t.from}, ${t.to})`,
      }}
    >
      {label && (
        <span
          aria-hidden
          className="absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold uppercase text-[#111]/[0.06] select-none"
          style={{ fontSize: "18vw", letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
