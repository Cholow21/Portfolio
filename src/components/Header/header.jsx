import "./header.css";
import wolfLogo from "../../assets/wolf.jpg";

export default function Header() {
  const items = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center px-12 py-4">
        <div className="flex items-center gap-3">
          <img
            src={wolfLogo}
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-white/60 shadow-md hover:scale-105 transition-transform duration-300"
          />
          <span className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
            Cholo Clemente
          </span>
        </div>

        <nav>
          <ul className="flex gap-8 text-lg text-white font-semibold">
            {items.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-blue-200 hover:scale-110 transition-all duration-300 drop-shadow-md"
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
