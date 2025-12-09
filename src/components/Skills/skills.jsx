import React from "react";

export function SkillPill({ skill }) {
  return (
    <span className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white font-medium rounded-md shadow-md hover:bg-white hover:text-black hover:shadow-lg border border-black hover:scale-105 transition-all duration-300 cursor-pointer text-sm sm:text-base">
      {skill}
    </span>
  );
}

export default function Skills({ data }) {
  return (
    <section
      id="skills"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-5 text-center"
    >
      <div className="relative bg-white text-black rounded-lg shadow-2xl shadow-white/10 p-6 sm:p-8 lg:p-10 xl:p-12 max-w-6xl mx-auto hover:shadow-3xl hover:shadow-white/20 transform hover:-translate-y-2 transition-all duration-500 border border-gray-200">
        <div className="relative z-10">
          <div className="inline-block mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold mb-2">
              Skills & Technologies
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-black rounded-full mx-auto"></div>
          </div>
          
          <div className="space-y-8 sm:space-y-12">
            {Object.entries(data).map(([category, skills], idx) => (
              <div 
                key={category}
                className="group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-6">
                  {category}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
                  {skills.map((skill, i) => (
                    <SkillPill key={i} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
