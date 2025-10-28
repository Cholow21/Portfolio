import "./about.css";

export default function About() {
  return (
    <section
      id="about"
      className="py-10 px-5 text-center flex justify-center items-start"
    >
      <div className="bg-white text-blue-900 rounded-xl shadow-lg p-10 max-w-4xl w-full mx-auto hover:scale-105 transform transition-transform duration-300">
        <h1 className="text-4xl text-[#0F4875] font-bold mb-6">
          Hello! I'm Cholo Clemente!
        </h1>
        <p className="text-base leading-relaxed">
          A 4th-year BSIT student eager to learn and grow through hands-on
          experience, continuously improving skills while adapting to new
          challenges in the field of IT.
        </p>
      </div>
    </section>
  );
}
