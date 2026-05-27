import { useState, useEffect } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import ch1 from "../../assets/CherryTomato/ch1.png";
import ch2 from "../../assets/CherryTomato/ch2.png";
import ch3 from "../../assets/CherryTomato/ch3.png";
import ch4 from "../../assets/CherryTomato/ch4.png";
import ch6 from "../../assets/CherryTomato/ch6.png";
import ch7 from "../../assets/CherryTomato/ch7.png";
import ch8 from "../../assets/CherryTomato/ch8.png";
import ch9 from "../../assets/CherryTomato/ch9.png";
import mz1 from "../../assets/Mezza/mz1.png";
import mz2 from "../../assets/Mezza/mz2.png";
import mz3 from "../../assets/Mezza/mz3.png";
import mz4 from "../../assets/Mezza/mz4.png";
import mz5 from "../../assets/Mezza/mz5.png";
import mz6 from "../../assets/Mezza/mz6.png";

export default function Projects({ data = [], id }) {
  const [openModal, setOpenModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const labelRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const listRef = useScrollReveal();

  const cherryTomatoImages = [ch1, ch2, ch3, ch4, ch6, ch7, ch8, ch9];
  const mezzaImages = [mz1, mz2, mz3, mz4, mz5, mz6];

  const builtInProjects = {
    cherry: {
      id: 1, name: "Cherry Tomato", description: "Pomodoro Productivity App", type: "Mobile Application",
      images: cherryTomatoImages,
      fullDescription: "Cherry Tomato is a productivity app that helps users manage their time using the Pomodoro technique. It supports task management, scheduling, and focus tracking through a clean and minimal interface.",
      techStack: "Flutter, Dart", teamSize: "5 Members", role: "Developer",
      features: ["Add, edit, and categorize tasks", "Pomodoro Timer with custom intervals", "Schedule View and Statistics Dashboard", "Smart alerts and notifications"]
    },
    mezza: {
      id: 2, name: "Mezza Residences", description: "Real Estate Website", type: "Website",
      images: mezzaImages,
      fullDescription: "Mezza Residences is a real estate website where users can explore building amenities, view rooms, and book units online.",
      techStack: "HTML, CSS, JavaScript", teamSize: "Solo Project", role: "Web Developer",
      features: ["Online booking and inquiry form", "Responsive design for all devices", "Interactive gallery of amenities", "Elegant and modern UI/UX presentation"],
      link: "/Mezza/index.html"
    }
  };

  useEffect(() => {
    if (!openModal || !selectedProject?.images) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedProject.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [openModal, selectedProject]);

  const allProjects = [
    { key: "cherry", ...builtInProjects.cherry },
    { key: "mezza", ...builtInProjects.mezza },
    ...data.filter(p => p.id > 2).map(p => ({ key: `custom-${p.id}`, ...p }))
  ];

  const projectsPerPage = 3;
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  const currentProjects = allProjects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const openProject = (project) => {
    setSelectedProject(project);
    setOpenModal(project.key);
    setCurrentIndex(0);
  };

  return (
    <>
      <section id={id} className="py-20 lg:py-32 px-6 sm:px-12 lg:px-24 theme-bg">
        <div className="max-w-6xl mx-auto">
          <div ref={labelRef} className="reveal flex items-center gap-3 mb-10">
            <div className="w-8 h-px" style={{ background: "var(--border-hover)" }} />
            <span className="text-xs font-mono tracking-widest uppercase theme-muted">
              03 — Projects<span className="blink text-blue-500 ml-1">_</span>
            </span>
          </div>

          <h2 ref={headingRef} className="reveal-right text-4xl sm:text-5xl font-black leading-none tracking-tighter theme-text mb-10">
            My<br />Work
          </h2>

          <div ref={listRef} className="reveal delay-100 space-y-0">
            {currentProjects.map((project, idx) => (
              <div
                key={project.key}
                onClick={() => openProject(project)}
                className="group grid grid-cols-4 gap-4 py-6 cursor-pointer transition-all duration-300 border-pulse"
                style={{ borderTop: "1px solid var(--border)" }}
                onMouseEnter={e => e.currentTarget.style.borderTopColor = "var(--border-hover)"}
                onMouseLeave={e => e.currentTarget.style.borderTopColor = "var(--border)"}
              >
                <div className="col-span-1">
                  <span className="text-xs font-mono theme-muted">
                    {String(idx + 1 + currentPage * projectsPerPage).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-2">
                  <h3 className="font-bold theme-text text-base group-hover:text-blue-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-mono">{project.description}</p>
                </div>
                <div className="col-span-1 text-right self-center">
                  <span className="text-xs font-mono border border-white/20 px-2 py-1 text-gray-500">
                    {project.type}
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="text-xs font-mono tracking-widest uppercase text-blue-500 hover:text-blue-300 disabled:opacity-30 transition-colors duration-300"
              >
                ← Prev
              </button>
              <span className="text-xs font-mono text-gray-500">{currentPage + 1} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="text-xs font-mono tracking-widest uppercase text-blue-500 hover:text-blue-300 disabled:opacity-30 transition-colors duration-300"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {openModal && selectedProject && (
        <div className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4" onClick={() => setOpenModal(null)}>
          <div className="bg-black border border-white/20 text-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-8 py-5 border-b border-white/10">
              <div>
                <h3 className="text-xl font-black tracking-tight text-white">{selectedProject.name}</h3>
                <span className="text-xs font-mono text-gray-500">{selectedProject.type}</span>
              </div>
              <button
                onClick={() => setOpenModal(null)}
                className="text-xs font-mono tracking-widest uppercase border border-white/20 px-4 py-2 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Close
              </button>
            </div>

            <div className="p-8">
              {selectedProject.images && (
                <div className="mb-8">
                  <div className="relative w-full h-72 bg-white/5 overflow-hidden">
                    <img src={selectedProject.images[currentIndex]} alt={selectedProject.name} className="w-full h-full object-contain" />
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black border border-white/20 w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 text-sm"
                      onClick={() => setCurrentIndex(p => (p - 1 + selectedProject.images.length) % selectedProject.images.length)}
                    >←</button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black border border-white/20 w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 text-sm"
                      onClick={() => setCurrentIndex(p => (p + 1) % selectedProject.images.length)}
                    >→</button>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {selectedProject.images.map((_, i) => (
                      <button key={i} onClick={() => setCurrentIndex(i)}
                        className={`h-0.5 transition-all duration-300 ${i === currentIndex ? "bg-white flex-1" : "bg-white/20 w-4"}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.imageUrl && !selectedProject.images && (
                <div className="w-full h-56 bg-white/5 overflow-hidden mb-8">
                  <img src={selectedProject.imageUrl} alt={selectedProject.name} className="w-full h-full object-cover" />
                </div>
              )}

              {(selectedProject.techStack || selectedProject.teamSize || selectedProject.role) && (
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-white/10 mb-6">
                  {[["Tech Stack", selectedProject.techStack], ["Team", selectedProject.teamSize], ["Role", selectedProject.role]].map(([k, v]) => v && (
                    <div key={k}>
                      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">{k}</p>
                      <p className="text-sm font-semibold text-white">{v}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                {selectedProject.fullDescription || selectedProject.description}
              </p>

              {selectedProject.features && (
                <div className="mb-6">
                  <p className="text-xs font-mono tracking-widest uppercase text-gray-500 mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="text-white mt-0.5">—</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                  className="inline-block text-xs font-mono tracking-widest uppercase border border-blue-500 text-blue-500 px-6 py-3 hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Visit Project →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
