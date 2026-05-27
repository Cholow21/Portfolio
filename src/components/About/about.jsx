import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function About({ data }) {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const textRef = useScrollReveal();

  const stats = [
    { value: "4th", label: "Year BSIT" },
    { value: "∞", label: "Always Learning" },
    { value: "2+", label: "Projects Built" },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            01 — About<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2 ref={headingRef} className="reveal-left text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tighter theme-text mb-8">
              About<br />Me
            </h2>
            <div ref={statsRef} className="reveal delay-200 grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}>
              {stats.map((s) => (
                <div key={s.label} className="group">
                  <div className="text-3xl font-black theme-text group-hover:text-blue-400 transition-colors duration-300">{s.value}</div>
                  <div className="text-xs theme-muted font-mono mt-1 tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={textRef} className="reveal-right space-y-6 theme-body text-base lg:text-lg leading-relaxed">
            {[data?.paragraph1, data?.paragraph2, data?.paragraph3].map((p, i) => (
              <p key={i} className="pl-4 hover:text-blue-400 transition-colors duration-300"
                style={{ borderLeft: "2px solid var(--border)" }}
                onMouseEnter={e => e.currentTarget.style.borderLeftColor = "#3b82f6"}
                onMouseLeave={e => e.currentTarget.style.borderLeftColor = "var(--border)"}
              >{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
