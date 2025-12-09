import React from "react";

export default function Home({ personalInfo = {} }) {
  const {
    name = "Marshal Cholo Clemente",
    title = "4th-year BSIT Student",
    birthday = "September 21, 2004",
    age = "21"
  } = personalInfo;

  return (
    <section
      id="home"
      className="relative -mx-4 sm:-mx-6 lg:-mx-8 flex flex-col justify-center items-center min-h-screen text-center overflow-hidden"
    >
      {/* Animated spotlight effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          Hi! I'm{" "}
          <span className="relative group text-white cursor-pointer inline-block hover:text-gray-300 transition-colors duration-300">
            {name}
            {/* Popup card */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-80 bg-white text-black text-left rounded-lg shadow-2xl border border-gray-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none z-50">
              <div className="p-6">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-black">
                    Personal Details
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium flex justify-between">
                    <span className="font-bold text-gray-700">Name:</span>
                    <span className="text-gray-600">{name}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className="font-bold text-gray-700">Birthday:</span>
                    <span className="text-gray-600">{birthday}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className="font-bold text-gray-700">Age:</span>
                    <span className="text-gray-600">{age}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className="font-bold text-gray-700">Year:</span>
                    <span className="text-gray-600">{title}</span>
                  </p>
                </div>
              </div>
            </div>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          A passionate {title.toLowerCase()} crafting digital experiences.
          <br />
          <span className="text-gray-400">Explore my journey, skills, and projects below.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#about"
            className="group relative inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-md 
            shadow-xl hover:shadow-2xl border border-white
            transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span>Learn More About Me</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-8 py-4 rounded-md 
            border border-white/50 hover:border-white hover:bg-white/10
            transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}
