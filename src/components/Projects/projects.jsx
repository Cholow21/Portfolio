import React, { useState, useEffect } from "react";
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

export default function Projects({ data = [] }) {
    const [openModal, setOpenModal] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const cherryTomatoImages = [ch1, ch2, ch3, ch4, ch6, ch7, ch8, ch9];
    const mezzaImages = [mz1, mz2, mz3, mz4, mz5, mz6];

    // Built-in projects with images
    const builtInProjects = {
        cherry: {
            id: 1,
            name: "Cherry Tomato",
            description: "Pomodoro Productivity App",
            type: "Mobile Application",
            images: cherryTomatoImages,
            fullDescription: "Cherry Tomato is a productivity app that helps users manage their time using the Pomodoro technique. It supports task management, scheduling, and focus tracking through a clean and minimal interface.",
            techStack: "Flutter, Dart",
            teamSize: "5 Members",
            role: "Developer",
            features: [
                "Add, edit, and categorize tasks",
                "Pomodoro Timer with custom intervals",
                "Schedule View and Statistics Dashboard",
                "Smart alerts and notifications"
            ]
        },
        mezza: {
            id: 2,
            name: "Mezza Residences",
            description: "Real Estate Website",
            type: "Website",
            images: mezzaImages,
            fullDescription: "Mezza Residences is a real estate website where users can explore building amenities, view rooms, and book units online. It offers a clean and interactive layout for an elegant property showcase.",
            techStack: "HTML, CSS, JavaScript",
            teamSize: "Solo Project",
            role: "Web Developer",
            features: [
                "Online booking and inquiry form",
                "Responsive design for all devices",
                "Interactive gallery of amenities (gym, pool, bedrooms)",
                "Elegant and modern UI/UX presentation"
            ],
            link: "/Mezza/index.html"
        }
    };

    useEffect(() => {
        if (!openModal || !selectedProject?.images) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                return (prev + 1) % selectedProject.images.length;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [openModal, selectedProject]);

    const handleOpenProject = (projectKey) => {
        setSelectedProject(builtInProjects[projectKey]);
        setOpenModal(projectKey);
        setCurrentIndex(0);
    };

    const handleOpenCustomProject = (project) => {
        setSelectedProject(project);
        setOpenModal(`custom-${project.id}`);
    };

    // Combine all projects
    const allProjects = [
        { key: "cherry", ...builtInProjects.cherry },
        { key: "mezza", ...builtInProjects.mezza },
        ...data.filter(p => p.id > 2).map(p => ({ key: `custom-${p.id}`, ...p }))
    ];

    // Pagination
    const projectsPerPage = 2;
    const totalPages = Math.ceil(allProjects.length / projectsPerPage);
    const startIndex = currentPage * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const currentProjects = allProjects.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="flex-1 relative bg-white text-black p-6 sm:p-10 rounded-lg shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-200">
                <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-black">
                        My Projects
                    </h2>

                    {/* Projects Grid - 2 per page */}
                    <div className="space-y-4 mb-6">
                        {currentProjects.map((project) => (
                            <div
                                key={project.key}
                                className="group bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:border-black"
                                onClick={() => {
                                    if (project.key === "cherry" || project.key === "mezza") {
                                        handleOpenProject(project.key);
                                    } else {
                                        handleOpenCustomProject(project);
                                    }
                                }}
                            >
                                {project.imageUrl && (
                                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-200">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <h3 className="font-bold text-black text-lg mb-2">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold rounded-md mb-2">
                                    {project.type}
                                </div>
                                <p className="text-black text-sm font-medium flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                                    View Details <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                                    currentPage === 0
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            >
                                ← Previous
                            </button>
                            
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-8 h-8 rounded-full font-medium transition-all duration-300 ${
                                            currentPage === i
                                                ? 'bg-black text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                                    currentPage === totalPages - 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Modal */}
            {openModal && selectedProject && (openModal === "cherry" || openModal === "mezza") && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4" onClick={() => setOpenModal(null)}>
                    <div className="bg-white text-black rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 pt-16 relative border border-gray-200" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-4 right-4 z-[60] text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition font-bold shadow-xl"
                        >
                            ✕
                        </button>

                        {selectedProject.images && (
                            <>
                                <div className="relative w-full h-80 overflow-hidden rounded-lg mb-6 shadow-md bg-gray-100">
                                    <img
                                        src={selectedProject.images[currentIndex]}
                                        alt={`${selectedProject.name} ${currentIndex + 1}`}
                                        className="w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                                    />
                                    <button
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-md hover:bg-black hover:text-white transition border border-gray-200"
                                        onClick={() =>
                                            setCurrentIndex(
                                                (prev) =>
                                                    (prev - 1 + selectedProject.images.length) %
                                                    selectedProject.images.length
                                            )
                                        }
                                    >
                                        ◀
                                    </button>
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-md hover:bg-black hover:text-white transition border border-gray-200"
                                        onClick={() =>
                                            setCurrentIndex(
                                                (prev) => (prev + 1) % selectedProject.images.length
                                            )
                                        }
                                    >
                                        ▶
                                    </button>
                                </div>

                                <div className="flex justify-center gap-2 mb-6">
                                    {selectedProject.images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-3 h-3 rounded-full transition-all ${
                                                i === currentIndex ? "bg-black w-8" : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <h3 className="text-2xl font-bold mb-4 text-center">
                            {selectedProject.name}
                        </h3>

                        {selectedProject.techStack && (
                            <p className="text-sm mb-4 text-center text-gray-600">
                                Type: {selectedProject.type} | Tech Stack: {selectedProject.techStack} <br />
                                Team Size: {selectedProject.teamSize} | Role: {selectedProject.role}
                            </p>
                        )}

                        <p className="mb-6 text-gray-700 leading-relaxed text-justify">
                            {selectedProject.fullDescription || selectedProject.description}
                        </p>

                        {selectedProject.link && (
                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-black text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                            >
                                View Website
                            </a>
                        )}

                        {selectedProject.features && (
                            <>
                                <h3 className="text-xl font-bold mb-3 mt-6">Key Features</h3>
                                <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mb-6">
                                    {selectedProject.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Custom Project Modal */}
            {openModal && selectedProject && openModal.startsWith('custom-') && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4" onClick={() => setOpenModal(null)}>
                    <div className="bg-white text-black rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 pt-16 relative border border-gray-200" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-4 right-4 z-[60] text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition font-bold shadow-xl"
                        >
                            ✕
                        </button>

                        {/* Project Image */}
                        {selectedProject.imageUrl && (
                            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={selectedProject.imageUrl}
                                    alt={selectedProject.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.parentElement.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold mb-2">
                                {selectedProject.name}
                            </h3>
                            <div className="inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-md">
                                {selectedProject.type}
                            </div>
                        </div>

                        {/* Project Details */}
                        {(selectedProject.techStack || selectedProject.teamSize || selectedProject.role) && (
                            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                    {selectedProject.techStack && (
                                        <div>
                                            <span className="font-bold text-gray-700">Tech Stack:</span>
                                            <p className="text-gray-600">{selectedProject.techStack}</p>
                                        </div>
                                    )}
                                    {selectedProject.teamSize && (
                                        <div>
                                            <span className="font-bold text-gray-700">Team Size:</span>
                                            <p className="text-gray-600">{selectedProject.teamSize}</p>
                                        </div>
                                    )}
                                    {selectedProject.role && (
                                        <div>
                                            <span className="font-bold text-gray-700">Role:</span>
                                            <p className="text-gray-600">{selectedProject.role}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h4 className="font-bold text-lg mb-2 text-black">Description</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </div>

                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h4 className="font-bold text-lg mb-3 text-black">Key Features</h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {selectedProject.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProject.link && (
                                <div className="text-center">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-black text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                                    >
                                        Visit Project →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
