import "./header.css";
import wolfLogo from "../../assets/wolf.jpg";

export default function Header({ name = "Cholo Clemente", profileImage }) {
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
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center px-6 sm:px-12 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={profileImage || wolfLogo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white/40 shadow-lg hover:scale-110 transition-all duration-300 hover:border-white object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-white tracking-wide hover:text-gray-300 transition-colors duration-300">
            {name}
          </span>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:block">
            <ul className="flex gap-8 text-base text-white font-medium">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="relative cursor-pointer group"
                  onClick={() => handleScroll(item.id)}
                >
                  <span className="hover:text-gray-300 transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </nav>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openAdminLogin'))}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
          >
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
