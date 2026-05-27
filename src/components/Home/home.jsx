import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Home({ personalInfo = {} }) {
  const {
    name = "Marshal Cholo Clemente",
    title = "BSIT Graduate",
    birthday = "September 21, 2004",
    age = "21",
  } = personalInfo;

  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const subtitleRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-24 pb-16 overflow-hidden theme-bg"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.04)" }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div ref={labelRef} className="reveal flex items-center gap-3 mb-8">
          <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
          <span className="text-xs font-mono tracking-widest uppercase theme-muted">
            Portfolio 2025<span className="blink text-blue-500 ml-1">_</span>
          </span>
        </div>

        <div ref={headingRef} className="reveal mb-6">
          {name.split(" ").map((word, i) => (
            <div
              key={i}
              className="glitch block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tighter theme-text"
              data-text={word}
            >
              {word}
            </div>
          ))}
        </div>

        <div ref={subtitleRef} className="reveal delay-100 flex flex-wrap items-center gap-4 sm:gap-6 mb-12 pt-6"
          style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm sm:text-base font-mono tracking-wide uppercase theme-muted">{title}</p>
          <span className="text-blue-500/60">✦</span>
          <p className="text-sm sm:text-base font-mono tracking-wide uppercase theme-muted">Malolos, Bulacan</p>
        </div>

        <div ref={ctaRef} className="reveal delay-200 flex flex-wrap gap-4 items-center">
          <a href="#projects"
            className="group relative px-8 py-3 font-semibold text-sm tracking-widest uppercase border border-blue-500 text-blue-500 overflow-hidden transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">View Work</span>
          </a>
          <a href="#contact"
            className="px-8 py-3 font-semibold text-sm tracking-widest uppercase theme-muted hover:text-blue-400 transition-colors duration-300"
          >
            Get In Touch →
          </a>
        </div>

        {/* Info card */}
        <div className="group absolute bottom-16 right-0 hidden lg:block">
          <div className="text-xs font-mono theme-muted mb-2 text-right tracking-widest"></div>
          <div className="relative cursor-default">
            <div className="w-44 h-44 flex items-center justify-center transition-all duration-500 group-hover:scale-105"
              style={{ border: "1px solid var(--border)" }}>
              <div className="text-center">
                <span className="text-5xl font-black theme-text group-hover:text-blue-400 transition-colors duration-300">{age}</span>
                <p className="text-xs font-mono theme-muted mt-1 tracking-widest">years old</p>
              </div>
            </div>
            <div className="absolute bottom-full right-0 mb-3 w-64 p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-mono theme-muted mb-4 flex items-center gap-2 tracking-widest uppercase">
                <span className="w-2 h-2 bg-blue-500 rounded-full inline-block animate-pulse" />
                Personal Details
              </p>
              {[["Name", name], ["Birthday", birthday], ["Age", age], ["Year", title]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs py-2" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="theme-muted font-mono">{k}</span>
                  <span className="font-semibold theme-text">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 theme-muted">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 animate-pulse" style={{ background: "var(--border-hover)" }} />
      </div>
    </section>
  );
}
