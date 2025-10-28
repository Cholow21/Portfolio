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

