import React from "react";

export default function Beyond() {
  return (
    <div className="group relative bg-white text-black p-8 sm:p-10 rounded-lg shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 w-full lg:w-1/2 transform hover:-translate-y-2 transition-all duration-500 border border-gray-200">
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Beyond Coding
        </h2>
        
        <div className="space-y-4">
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 hover:text-black transition-colors duration-300">
            When I'm not writing code, I enjoy being outside doing side quests —
            whether it's <span className="font-semibold text-black">hiking, biking</span>, or just exploring new places.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 hover:text-black transition-colors duration-300">
            I believe life outside the screen sparks creativity inside it. Those
            small adventures help me bring <span className="font-semibold text-black">fresh energy and perspective</span> into every
            project I build.
          </p>
        </div>
      </div>
    </div>
  );
}
