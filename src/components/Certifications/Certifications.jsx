import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Certifications({ data = [] }) {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const listRef = useScrollReveal();

  const defaultCertifications = [
    { id: 1, title: "Microsoft Office Specialist (MOS)", subtitle: "Microsoft Excel", issuer: "Microsoft" },
    { id: 2, title: "Microsoft Office Specialist (MOS)", subtitle: "Microsoft Access", issuer: "Microsoft" },
    { id: 3, title: "Introduction to Cybersecurity", subtitle: "Cybersecurity Fundamentals", issuer: "Cisco" },
  ];

  const certifications = data && data.length > 0 ? data : defaultCertifications;

  return (
    <section id="certifications" className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            04 — Certifications<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <h2 ref={headingRef} className="reveal-left text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tighter theme-text mb-12 lg:mb-16">
          My<br />Credentials
        </h2>

        <div ref={listRef} className="reveal delay-100">
          {certifications.map((cert, idx) => (
            <div key={cert.id}
              className="group grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 py-8 border-pulse transition-all duration-300"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="sm:col-span-1">
                <span className="text-xs font-mono tracking-widest theme-muted">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-base font-bold theme-text group-hover:text-blue-400 transition-colors duration-300">{cert.title}</h3>
                <p className="theme-muted text-sm mt-1 font-mono">{cert.subtitle}</p>
              </div>
              <div className="sm:col-span-1 sm:text-right self-center">
                <span className="text-xs font-mono px-3 py-1 theme-muted transition-all duration-300"
                  style={{ border: "1px solid var(--border)" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hover)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                >
                  {cert.issuer}
                </span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
