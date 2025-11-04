import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";
import Skills from "./components/Skills/skills";
import TechFeed from "./components/Techfeed/TechFeed";
import Home from "./components/Home/home";
import Projects from "./components/Projects/projects";
import Beyond from "./components/Beyond/beyond";


export default function App() {
  return (
    <div className="bg-[#0F4875] min-h-screen text-white">
      <Header />
      <Home />
      <About />
      <Skills />
      <TechFeed />
      
    <section className="flex flex-col lg:flex-row gap-6 px-6 py-16">
      <Beyond />
      <Projects />
    </section>
 
      <Contact />

    </div>
  );
}
