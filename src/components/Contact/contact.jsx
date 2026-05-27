import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Contact({ data }) {
  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const listRef = useScrollReveal();
  const footerRef = useScrollReveal();

  const contactInfo = [
    { label: "Email", value: data?.email, link: `mailto:${data?.email}` },
    { label: "Instagram", value: data?.instagram, link: `https://www.instagram.com/tiyolow/` },
    { label: "Facebook", value: data?.facebook, link: "https://www.facebook.com/Cholo.Clemente21" },
    { label: "Phone", value: data?.phone, link: null },
    { label: "Address", value: data?.address, link: null },
  ];

  return (
    <footer id="contact" className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
      <div className="max-w-6xl mx-auto">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-12">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            05 — Contact<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <h2 ref={headingRef} className="reveal-left text-4xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tighter theme-text mb-12 lg:mb-16">
          Let's<br />Connect
        </h2>

        <div ref={listRef} className="reveal delay-100 mb-16 sm:mb-20">
          {contactInfo.map((item, idx) => (
            <div key={idx}
              className="group grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 py-5 border-pulse transition-all duration-300"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <span className="text-xs font-mono tracking-widest uppercase theme-muted self-center">{item.label}</span>
              <div className="sm:col-span-3 self-center">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-3 text-blue-500 font-semibold hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-blue-400 after:transition-all after:duration-300 group-hover/link:after:w-full">
                      {item.value}
                    </span>
                    <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                ) : (
                  <span className="theme-text font-semibold">{item.value}</span>
                )}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>

        <div ref={footerRef} className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}>
          <p className="theme-muted text-xs font-mono">© 2025 Marshal Cholo Clemente. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="theme-muted text-xs font-mono">Available for opportunities</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
