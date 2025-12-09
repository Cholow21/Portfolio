import "./about.css";

export default function About({ data }) {
  return (
    <section
      id="about"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-5 text-center flex justify-center items-start"
    >
      <div className="relative bg-white text-black rounded-lg shadow-2xl shadow-white/10 p-6 sm:p-8 lg:p-10 xl:p-12 max-w-5xl w-full mx-auto hover:shadow-3xl hover:shadow-white/20 transform hover:-translate-y-2 transition-all duration-500 border border-gray-200">
        <div className="relative z-10">
          <div className="inline-block mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold mb-2">
              About Me
            </h1>
            <div className="h-1 w-20 sm:w-24 bg-black rounded-full mx-auto"></div>
          </div>
          
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
            <p className="hover:text-black transition-colors duration-300">
              {data.paragraph1}
            </p>
            
            <p className="hover:text-black transition-colors duration-300">
              {data.paragraph2}
            </p>
            
            <p className="hover:text-black transition-colors duration-300">
              {data.paragraph3}
            </p>
          </div>

          {/* Stats or highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">4th</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Year BSIT Student</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">∞</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Learning & Growing</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              <div className="text-3xl sm:text-4xl font-bold text-black mb-2">+</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Problem Solver</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
