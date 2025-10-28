import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";
import Skills from "./components/Skills/skills";
import TechFeed from "./components/Techfeed/TechFeed";
import Home from "./components/Home/home";

export default function App() {
  return (
    <div className="bg-[#0F4875] min-h-screen text-white">
      <Header />
      <Home />
      <About />
      <Skills />
      <TechFeed />
      <Contact />
    </div>
  );
}
