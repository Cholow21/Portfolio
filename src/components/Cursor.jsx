import { useEffect, useRef } from "react";

export default function Cursor({ isDarkMode = true }) {
  const dot = useRef(null);
  const ring = useRef(null);

  // Update colors when theme changes
  useEffect(() => {
    const dotColor = isDarkMode ? "#ffffff" : "#000000";
    const ringColor = isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
    if (dot.current) dot.current.style.background = dotColor;
    if (ring.current) ring.current.style.borderColor = ringColor;
  }, [isDarkMode]);

  useEffect(() => {
    const moveCursor = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + "px";
        ring.current.style.top = e.clientY + "px";
      }
    };

    const onEnter = () => ring.current?.classList.add("hovering");
    const onLeave = () => ring.current?.classList.remove("hovering");

    window.addEventListener("mousemove", moveCursor);

    const clickables = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    clickables.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clickables.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
