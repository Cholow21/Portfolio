import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Beyond() {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const textRef = useScrollReveal();
  const tagsRef = useScrollReveal();

  return (
    <section className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-10">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            Beyond Coding<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <h2 ref={headingRef} className="reveal-left text-3xl sm:text-4xl font-black leading-tight tracking-tighter theme-text mb-8">
          Life Outside the Screen
        </h2>

        <div className="w-full h-px mb-8"
          style={{ background: "linear-gradient(to right, var(--border-hover), rgba(59,130,246,0.2), transparent)" }} />

        <div ref={textRef} className="reveal space-y-4 delay-100 max-w-2xl">
          {[
            <>When I'm not writing code, I enjoy being outside — whether it's <strong className="theme-text">hiking, biking</strong>, or just exploring new places.</>,
            <>Those adventures help me bring <strong className="theme-text">fresh energy and perspective</strong> into every project I build.</>
          ].map((content, i) => (
            <p key={i} className="theme-body text-sm leading-relaxed pl-4 transition-colors duration-300"
              style={{ borderLeft: "2px solid var(--border)" }}
              onMouseEnter={e => e.currentTarget.style.borderLeftColor = "#3b82f6"}
              onMouseLeave={e => e.currentTarget.style.borderLeftColor = "var(--border)"}
            >{content}</p>
          ))}
        </div>

        <div ref={tagsRef} className="reveal delay-200 mt-10 flex flex-wrap gap-2">
          {["Hiking", "Biking", "Gaming", "Exploring"].map((tag) => (
            <span key={tag}
              className="group/tag relative text-xs font-mono px-4 py-2 theme-muted overflow-hidden cursor-default transition-all duration-300"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
