import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Skills({ data }) {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();

  return (
    <section id="skills" className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            02 — Skills<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <h2 ref={headingRef} className="reveal-left text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tighter theme-text mb-12 lg:mb-16">
          Tech<br />Stack
        </h2>

        <div>
          {Object.entries(data).map(([category, skills], idx) => (
            <div key={category} className="group grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 py-8 border-pulse transition-all duration-300"
              style={{ borderTop: "1px solid var(--border)" }}>
              <div className="sm:col-span-1">
                <span className="text-xs font-mono tracking-widest uppercase theme-muted">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-bold mt-1 theme-text group-hover:text-blue-400 transition-colors duration-300">{category}</p>
              </div>
              <div className="sm:col-span-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill}
                    className="group/pill relative px-4 py-2 text-sm font-mono theme-muted overflow-hidden cursor-default transition-all duration-200 hover:theme-text"
                    style={{ border: "1px solid var(--border)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
