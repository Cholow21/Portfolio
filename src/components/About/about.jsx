import "./about.css";

export default function About() {
  return (
    <section
      id="about"
      className="py-10 px-5 text-center flex justify-center items-start"
    >
      <div className="bg-white text-blue-900 rounded-xl shadow-lg p-10 max-w-4xl w-full mx-auto hover:scale-105 transform transition-transform duration-300">
        <h1 className="text-4xl text-[#0F4875] font-bold mb-6">
          About Me
        </h1>
        <p className="text-base leading-relaxed">
          I’m a 4th-year BSIT student passionate about learning and growing through hands-on experience. I constantly strive to improve my skills and adapt to new challenges in the ever-evolving field of technology.

I have a strong curiosity for exploring new technologies and applications, especially those that push me to think creatively and critically.,<br /><br /> While I don’t code every day, I can comfortably understand and read simple code, and I’m continuously working on becoming more confident in development.

<br /><br />Outside the world of coding, I’m an avid sports and gaming enthusiast. I enjoy activities that challenge my critical thinking and problem-solving skills — even when they can be tough — because I love the sense of achievement that comes with overcoming challenges.
        </p>
      </div>
    </section>
  );
}
