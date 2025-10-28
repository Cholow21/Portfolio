import React from "react";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center min-h-screen text-center overflow-hidden transition-all duration-500"
    >
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg hover:text-blue-200 transition-colors duration-300">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg text-gray-200 mb-10 leading-relaxed">
          I'm <span className="font-semibold text-white">Cholo Clemente</span>, a
          passionate 4th-year BSIT student. Explore my journey, skills, and
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
