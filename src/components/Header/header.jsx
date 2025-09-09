import "./header.css";
import wolfLogo from "../../assets/wolf.jpg";

export default function Header() {
  const items = [
    "Home",
    "About",
    "Skills",
    "Education",
    "Work",
    "Experience",
    "Contact",
  ];

  return (
    <header className="header">
      <div className="logo">
        <img src={wolfLogo} alt="Logo" className="logo-img" />
        <span className="logo-text">Cholo Clemente</span> {"Cholo Clemente"}
      </div>
      <nav>
        <ul className="nav-list">
          {items.map((item, index) => (
            <li key={index} className="nav-item">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
