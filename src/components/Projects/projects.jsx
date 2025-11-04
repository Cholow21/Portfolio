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

export default function Projects() {
    const [openModal, setOpenModal] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cherryTomatoImages = [ch1, ch2, ch3, ch4, ch6, ch7, ch8, ch9];
    const mezzaImages = [mz1, mz2, mz3, mz4, mz5, mz6];


    useEffect(() => {
        if (!openModal) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const images =
                    openModal === "cherry" ? cherryTomatoImages : mezzaImages;
                return (prev + 1) % images.length;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [openModal]);

    return (
        <div className="bg-white text-[#0F4875] p-8 rounded-2xl shadow-md w-full lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-[#0F4875]">▣</span> My Projects
            </h2>


            <div
                className="bg-[#f5f8fc] border border-[#cfdde8] rounded-xl p-6 text-center shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 mb-4"
                onClick={() => {
                    setOpenModal("cherry");
                    setCurrentIndex(0);
                }}
            >
                <h3 className="font-semibold text-[#0F4875] text-lg mb-1">
                    Cherry Tomato – Pomodoro Productivity App
                </h3>
                <p className="text-sm text-gray-600">Mobile Application</p>
                <p className="text-[#0F4875] text-sm mt-3 font-medium">
                    View more →
                </p>
            </div>


            <div
                className="bg-[#f5f8fc] border border-[#cfdde8] rounded-xl p-6 text-center shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300"
                onClick={() => {
                    setOpenModal("mezza");
                    setCurrentIndex(0);
                }}
            >
                <h3 className="font-semibold text-[#0F4875] text-lg mb-1">
                    Mezza Residences – Real Estate Website
                </h3>
                <p className="text-sm text-gray-600">Website</p>
                <p className="text-[#0F4875] text-sm mt-3 font-medium">
                    View more →
                </p>
            </div>


            {openModal === "cherry" && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <div className="bg-white/90 backdrop-blur-md text-[#0F4875] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-[#cfdde8]">
                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-4 right-4 text-white bg-[#0F4875] px-3 py-1 rounded-lg hover:bg-[#09355e] transition"
                        >
                            ✕
                        </button>

                        <div className="relative w-full h-80 overflow-hidden rounded-lg mb-6 shadow-md">
                            <img
                                src={cherryTomatoImages[currentIndex]}
                                alt={`Cherry Tomato ${currentIndex + 1}`}
                                className="w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                            />
                            <button
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-[#0F4875] hover:text-white transition"
                                onClick={() =>
                                    setCurrentIndex(
                                        (prev) =>
                                            (prev - 1 + cherryTomatoImages.length) %
                                            cherryTomatoImages.length
                                    )
                                }
                            >
                                ◀
                            </button>
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-[#0F4875] hover:text-white transition"
                                onClick={() =>
                                    setCurrentIndex(
                                        (prev) => (prev + 1) % cherryTomatoImages.length
                                    )
                                }
                            >
                                ▶
                            </button>
                        </div>

                        <div className="flex justify-center gap-2 mb-6">
                            {cherryTomatoImages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-[#0F4875]" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 text-center">
                            Cherry Tomato – Pomodoro Productivity App
                        </h3>

                        <p className="text-sm mb-4 text-center text-gray-700">
                            Type: Mobile Application | Tech Stack: Flutter, Dart <br />
                            Team Size: 5 Members | Role: Developer
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed text-justify">
                            Cherry Tomato is a productivity app that helps users manage their
                            time using the Pomodoro technique. It supports task management,
                            scheduling, and focus tracking through a clean and minimal
                            interface.
                        </p>

                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mb-6">
                            <li>Add, edit, and categorize tasks</li>
                            <li>Pomodoro Timer with custom intervals</li>
                            <li>Schedule View and Statistics Dashboard</li>
                            <li>Smart alerts and notifications</li>
                        </ul>
                    </div>
                </div>
            )}


            {openModal === "mezza" && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    <div className="bg-white/90 backdrop-blur-md text-[#0F4875] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-[#cfdde8]">
                        <button
                            onClick={() => setOpenModal(null)}
                            className="absolute top-4 right-4 text-white bg-[#0F4875] px-3 py-1 rounded-lg hover:bg-[#09355e] transition"
                        >
                            ✕
                        </button>

                        <div className="relative w-full h-80 overflow-hidden rounded-lg mb-6 shadow-md">
                            <img
                                src={mezzaImages[currentIndex]}
                                alt={`Mezza Residences ${currentIndex + 1}`}
                                className="w-full h-full object-contain transition-opacity duration-700 ease-in-out"
                            />
                            <button
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-[#0F4875] hover:text-white transition"
                                onClick={() =>
                                    setCurrentIndex(
                                        (prev) =>
                                            (prev - 1 + mezzaImages.length) % mezzaImages.length
                                    )
                                }
                            >
                                ◀
                            </button>
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-[#0F4875] hover:text-white transition"
                                onClick={() =>
                                    setCurrentIndex((prev) => (prev + 1) % mezzaImages.length)
                                }
                            >
                                ▶
                            </button>
                        </div>

                        <div className="flex justify-center gap-2 mb-6">
                            {mezzaImages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-[#0F4875]" : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 text-center">
                             Mezza Residences – Real Estate Website
                        </h3>

                        <p className="text-sm mb-4 text-center text-gray-700">
                            Type: Website | Tech Stack: HTML, CSS, JavaScript <br />
                            Team Size: Solo Project | Role: Web Developer
                        </p>

                        <p className="mb-6 text-gray-700 leading-relaxed text-justify">
                            Mezza Residences is a real estate website where users can explore
                            building amenities, view rooms, and book units online. It offers a
                            clean and interactive layout for an elegant property showcase.
                        </p>

                        <a
                            href="/Mezza/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 bg-[#0F4875] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#09355e] hover:shadow-lg transition-all duration-300"
                        >
                            View
                        </a>

                        <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                        <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mb-6">
                            <li>Online booking and inquiry form</li>
                            <li>Responsive design for all devices</li>
                            <li>Interactive gallery of amenities (gym, pool, bedrooms)</li>
                            <li>Elegant and modern UI/UX presentation</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
