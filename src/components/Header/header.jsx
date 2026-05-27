import { useState } from "react";
import ProfileSlideshow from "../ProfileSlideshow";

export default function Header({ name = "Cholo Clemente", profileImage, profileImages = [], isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ThemeButton = () => (
    <button
      onClick={onToggleTheme}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 flex-shrink-0"
      style={{
        background: isDarkMode ? "#1a1a1a" : "#fff",
        border: isDarkMode ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <svg
        className={!isDarkMode ? "bulb-glow" : ""}
        width="18" height="18" viewBox="0 0 24 24"
        fill={!isDarkMode ? "#facc15" : "none"}
        stroke={isDarkMode ? "#ffffff" : "#ca8a04"}
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M9 21h6" />
        <path d="M10 17h4" />
        <path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V16H9v-1.8A6.001 6.001 0 0 1 6 9a6 6 0 0 1 6-6z" />
        {!isDarkMode && <line x1="12" y1="9" x2="12" y2="13" stroke="#ca8a04" strokeWidth="2" />}
      </svg>
    </button>
  );

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 overflow-visible"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 max-w-7xl mx-auto overflow-visible">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
        >
          <ProfileSlideshow
            images={profileImages.length > 0 ? profileImages : (profileImage ? [profileImage] : [])}
            size="sm"
            interval={3500}
          />
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase hidden sm:block theme-text">
            {name.split(" ").slice(-1)[0]}
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-xs font-mono tracking-widest uppercase cursor-pointer transition-colors duration-300 theme-muted hover:text-blue-400"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle — always visible in header */}
          <ThemeButton />

          {/* Login */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openAdminLogin"))}
            className="text-xs font-mono tracking-widest uppercase px-3 sm:px-4 py-2 transition-all duration-300 text-white hover:text-blue-400"
            style={{ border: "1px solid var(--border)" }}
          >
            Login
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 ml-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ background: "var(--text)" }} />
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              style={{ background: "var(--text)" }} />
            <span className={`block w-5 h-px transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ background: "var(--text)" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-6 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <ul className="space-y-0">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-xs font-mono tracking-widest uppercase cursor-pointer theme-muted hover:text-blue-400 transition-colors duration-300 py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
