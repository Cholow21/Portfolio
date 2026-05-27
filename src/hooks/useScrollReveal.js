import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already animated before (e.g. theme switch), keep it visible immediately
    if (hasAnimated.current) {
      el.classList.add("visible");
      return;
    }

    // If element is already in viewport on mount, show immediately
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      el.classList.add("visible");
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          hasAnimated.current = true;
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  return ref;
}
