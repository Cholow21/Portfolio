export default function Marquee({ skills = [] }) {
  const items = skills.length > 0
    ? skills
    : ["JavaScript", "React", "Tailwind", "CSS", "Vite", "Node.js", "Java", "MySQL", "HTML", "Git", "GitHub", "Figma", "Flutter", "Firebase"];

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3 select-none" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-xs font-mono tracking-widest uppercase text-gray-600 whitespace-nowrap">
            {item}
            <span className="text-blue-500/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
