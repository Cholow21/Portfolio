import React from "react";

export default function Home({ personalInfo = {}, isDarkMode = true }) {
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
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-pulse-slow ${
          isDarkMode ? 'bg-white/5' : 'bg-black/5'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 animate-fade-in">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Hi! I'm{" "}
          <span className={`relative group cursor-pointer inline-block transition-colors duration-300 ${
            isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'
          }`}>
            {name}
            {/* Popup card */}
            <div className={`absolute left-1/2 -translate-x-1/2 mt-4 sm:mt-6 w-72 sm:w-80 text-left rounded-lg shadow-2xl border opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none z-50 ${
              isDarkMode ? 'bg-white text-black border-gray-200' : 'bg-gray-900 text-white border-gray-700'
            }`}>
              <div className="p-6">
                <div className={`mb-4 pb-3 border-b ${isDarkMode ? 'border-gray-200' : 'border-gray-700'}`}>
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}>
                    Personal Details
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium flex justify-between">
                    <span className={`font-bold ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>Name:</span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>{name}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className={`font-bold ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>Birthday:</span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>{birthday}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className={`font-bold ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>Age:</span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>{age}</span>
                  </p>
                  <p className="text-sm font-medium flex justify-between">
                    <span className={`font-bold ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>Year:</span>
                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>{title}</span>
                  </p>
                </div>
              </div>
            </div>
          </span>
        </h1>

        <p className={`text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto font-light px-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A passionate {title.toLowerCase()} crafting digital experiences.
          <br />
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Explore my journey, skills, and projects below.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <a
            href="#about"
            className={`group relative inline-flex items-center justify-center gap-2 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md 
            shadow-xl hover:shadow-2xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center text-sm sm:text-base ${
              isDarkMode ? 'bg-white text-black border-white' : 'bg-gray-900 text-white border-gray-900'
            }`}
          >
            <span>Learn More About Me</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          
          <a
            href="#contact"
            className={`inline-flex items-center justify-center gap-2 bg-transparent font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-md 
            border transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center text-sm sm:text-base ${
              isDarkMode 
                ? 'text-white border-white/50 hover:border-white hover:bg-white/10' 
                : 'text-gray-900 border-gray-900/50 hover:border-gray-900 hover:bg-gray-900/10'
            }`}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
          isDarkMode ? 'border-white/50' : 'border-gray-900/50'
        }`}>
          <div className={`w-1 h-2 rounded-full animate-scroll ${
            isDarkMode ? 'bg-white/70' : 'bg-gray-900/70'
          }`}></div>
        </div>
      </div>
    </section>
  );
}
