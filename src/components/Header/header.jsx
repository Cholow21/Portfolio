import wolfLogo from "../../assets/wolf.jpg";

export default function Header({ name = "Cholo Clemente", profileImage, isDarkMode, onToggleTheme }) {
  const items = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Lightbulb theme toggle — fixed top right */}
      <button
        onClick={onToggleTheme}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="fixed top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
        style={{
          background: isDarkMode ? "#1a1a1a" : "#fff",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(0,0,0,0.15)",
          color: isDarkMode ? "#ffffff" : "#facc15",
        }}
      >
        <svg
          className={!isDarkMode ? "bulb-glow" : ""}
          width="20" height="20" viewBox="0 0 24 24"
          fill={!isDarkMode ? "#facc15" : "none"}
          stroke={isDarkMode ? "#6b7280" : "#ca8a04"}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M9 21h6" />
          <path d="M10 17h4" />
          <path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V16H9v-1.8A6.001 6.001 0 0 1 6 9a6 6 0 0 1 6-6z" />
          {!isDarkMode && <line x1="12" y1="9" x2="12" y2="13" stroke="#ca8a04" strokeWidth="2" />}
        </svg>
      </button>

      <header
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300"
        style={{ background: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="flex justify-between items-center px-6 sm:px-12 py-4 max-w-7xl mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <img
              src={profileImage || wolfLogo}
              alt="Logo"
              className="w-9 h-9 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ border: "1px solid var(--border)" }}
            />
            <span className="text-sm font-mono tracking-widest uppercase hidden sm:block theme-text">
              {name.split(" ").slice(-1)[0]}
            </span>
          </button>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
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

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openAdminLogin"))}
            className="text-xs font-mono tracking-widest uppercase px-4 py-2 transition-all duration-300 text-white hover:text-blue-400"
            style={{ border: "1px solid var(--border)" }}
          >
            Login
          </button>
        </div>
      </header>
    </>
  );
}
