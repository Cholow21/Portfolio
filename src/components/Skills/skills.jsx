import React from "react";

export const skillsData = {
  Frontend: ["JavaScript", "React", "Tailwind CSS", "Vite"],
  Backend: ["Node.js", "Java", "MySQL", "HTML"],
  "Developer Tools": ["Git", "GitHub", "VSCode", "Discord", "Trello", "Teams"],
  "No Code": ["Figma"],
};

export function SkillPill({ skill }) {
  return (
    <span className="px-5 py-2 bg-[#0F4875] text-white font-medium rounded-full shadow-md hover:bg-white hover:text-[#0F4875] transition-colors duration-300 cursor-pointer">
      {skill}
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-2 px-5 hover:scale-105 transform transition-transform duration-300 text-center"
    >
      <div className="bg-white text-blue-900 rounded-xl shadow-lg p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl text-[#0F4875] font-bold mb-8">Skills</h1>
        <div className="space-y-10">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, i) => (
                  <SkillPill key={i} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
