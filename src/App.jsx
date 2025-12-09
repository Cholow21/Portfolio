import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";
import Skills from "./components/Skills/skills";
import TechFeed from "./components/Techfeed/TechFeed";
import Home from "./components/Home/home";
import Projects from "./components/Projects/projects";
import Beyond from "./components/Beyond/beyond";
import Certifications from "./components/Certifications/Certifications";
import Login from "./components/Admin/Login";
import AdminPanel from "./components/Admin/AdminPanel";
import { getPortfolioData, savePortfolioData } from "./firebase/portfolioService";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initial portfolio data
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: "Marshal Cholo Clemente",
      title: "4th-year BSIT Student",
      birthday: "September 21, 2004",
      age: "21"
    },
    about: {
      paragraph1: "I'm a 4th-year BSIT student passionate about learning and growing through hands-on experience. I constantly strive to improve my skills and adapt to new challenges in the ever-evolving field of technology.",
      paragraph2: "I have a strong curiosity for exploring new technologies and applications, especially those that push me to think creatively and critically. While I don't code every day, I can comfortably understand and read simple code, and I'm continuously working on becoming more confident in development.",
      paragraph3: "Outside the world of coding, I'm an avid sports and gaming enthusiast. I enjoy activities that challenge my critical thinking and problem-solving skills — even when they can be tough — because I love the sense of achievement that comes with overcoming challenges."
    },
    skills: {
      Frontend: ["JavaScript", "React", "Tailwind", "CSS", "Vite"],
      Backend: ["Node.js", "Java", "MySQL", "HTML"],
      "Developer Tools": ["Git", "GitHub", "VSCode", "Discord", "Trello", "Teams"],
      "No Code": ["Figma"]
    },
    projects: [
      { id: 1, name: "Cherry Tomato", description: "Pomodoro Productivity App", type: "Mobile Application" },
      { id: 2, name: "Mezza Residences", description: "Real Estate Website", type: "Website" }
    ],
    contact: {
      email: "choloclemente21@gmail.com",
      phone: "+63 968 462 9407",
      instagram: "@choloclm",
      facebook: "Cholo Clemente",
      address: "Malolos Bulacan"
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load data from Firebase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try Firebase first with timeout
        const loadPromise = getPortfolioData();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Load timeout')), 5000)
        );
        
        const data = await Promise.race([loadPromise, timeoutPromise]);
        if (data) {
          setPortfolioData(data);
          localStorage.setItem('portfolioData', JSON.stringify(data));
          console.log('✅ Loaded from Firebase');
        }
      } catch (error) {
        console.warn('⚠️ Firebase load failed, trying localStorage:', error);
        // Try localStorage as fallback
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
          setPortfolioData(JSON.parse(saved));
          console.log('📦 Loaded from localStorage');
        } else {
          console.log('📝 Using default data');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleOpenLogin = () => setShowLogin(true);
    window.addEventListener('openAdminLogin', handleOpenLogin);
    return () => window.removeEventListener('openAdminLogin', handleOpenLogin);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowAdminPanel(true);
  };

  const handleUpdateData = async (newData) => {
    try {
      // Update local state first
      setPortfolioData(newData);
      // Save to localStorage as backup
      localStorage.setItem('portfolioData', JSON.stringify(newData));
      
      // Try to save to Firebase with timeout
      const savePromise = savePortfolioData(newData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Save timeout - taking too long')), 10000)
      );
      
      await Promise.race([savePromise, timeoutPromise]);
      console.log('✅ Portfolio data saved successfully to Firebase');
    } catch (error) {
      console.error('⚠️ Firebase save failed:', error);
      // Data is still saved locally, so don't throw error
      console.log('📦 Data saved to localStorage only');
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <Header name={portfolioData.personalInfo?.name} profileImage={portfolioData.personalInfo?.profileImage} />
      <Home personalInfo={portfolioData.personalInfo} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <TechFeed />
      
      <section id="projects" className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        <Beyond />
        <Projects data={portfolioData.projects} />
      </section>

      <Certifications data={portfolioData.certifications} />
 
      <Contact data={portfolioData.contact} />

      {showLogin && !isAuthenticated && <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
      {showAdminPanel && isAuthenticated && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={handleCloseAdminPanel}
          portfolioData={portfolioData}
          onUpdateData={handleUpdateData}
        />
      )}
    </div>
  );
}
