import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";
import { skillsData, SkillPill } from "./components/Skills/skills";

export default function App() {
  return (
    <div>
      <Header />
      <About />
      <section className="py-2 px-5 hover:scale-105 transform transition-transform duration-300 text-center">
        <div className="bg-white text-blue-900 rounded-xl shadow-lg p-10 max-w-4xl mx-auto">
          <h1 className="text-4xl text-[#0F4875] font-bold mb-8">Tech Stack</h1>
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
      <Contact />
    </div>
  );
}
