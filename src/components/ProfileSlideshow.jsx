import { useState, useEffect } from "react";
import wolfLogo from "../assets/wolf.jpg";

export default function ProfileSlideshow({ images = [], size = "sm", interval = 3000 }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [hovered, setHovered] = useState(false);

  const slides = images.length > 0 ? images : [wolfLogo];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFade(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const sizeClass = size === "lg" ? "w-32 h-32 sm:w-40 sm:h-40" : "w-8 h-8 sm:w-9 sm:h-9";

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Small image */}
      <img
        src={slides[current]}
        alt="Profile"
        className={`${sizeClass} rounded-full object-cover transition-all duration-300`}
        style={{ opacity: fade ? 1 : 0, border: "1px solid var(--border)" }}
      />

      {/* Enlarged popup on hover */}
      <div
        className="absolute left-1/2 z-50 pointer-events-none transition-all duration-300"
        style={{
          top: "calc(100% + 12px)",
          transform: `translateX(-50%) scale(${hovered ? 1 : 0.85})`,
          transformOrigin: "top center",
          opacity: hovered ? 1 : 0,
        }}
      >
        <img
          src={slides[current]}
          alt="Profile enlarged"
          style={{
            maxWidth: "180px",
            maxHeight: "240px",
            width: "auto",
            height: "auto",
            display: "block",
            border: "2px solid var(--border-hover)",
            borderRadius: "4px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s",
            background: "var(--bg-secondary)",
          }}
        />
      </div>
    </div>
  );
}
