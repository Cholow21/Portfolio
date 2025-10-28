import React from "react";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center min-h-screen text-center overflow-hidden transition-all duration-500"
    >
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg transition-colors duration-300">
          Hi! I'm{" "}
          <span className="relative group text-blue-300 hover:text-blue-200 cursor-pointer transition-colors duration-300">
            Marshal Cholo Clemente
            {/* Popup card */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-72 bg-white/90 backdrop-blur-md text-[#0F4875] text-left rounded-2xl shadow-2xl border border-white/40 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 border-b border-blue-200 pb-1 text-[#0F4875]">
                  Personal Details
                </h3>
                <p className="text-sm font-medium">
                  <span className="font-bold text-blue-700">Name:</span>{" "}
                  Marshal Cholo Clemente
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold text-blue-700">Birthday:</span>{" "}
                  September 21, 2004
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold text-blue-700">Age:</span> 21
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold text-blue-700">Year:</span> BSIT 4th year
                </p>
              </div>
            </div>
          </span>
        </h1>

        <p className="text-lg text-gray-200 mb-10 leading-relaxed">
          A passionate 4th-year BSIT student. Explore my journey, skills, and
          projects below.
        </p>

        <a
          href="#about"
          className="inline-block bg-white text-[#0F4875] font-semibold px-8 py-3 rounded-full 
          shadow-xl hover:bg-transparent hover:text-white hover:border-white border-2 
          transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
        >
          Learn More About Me
        </a>
      </div>
    </section>
  );
}
