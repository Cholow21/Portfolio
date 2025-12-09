export default function Certifications({ data = [] }) {
  const defaultCertifications = [
    {
      id: 1,
      title: "Microsoft Office Specialist (MOS)",
      subtitle: "Microsoft Excel",
      issuer: "Microsoft"
    },
    {
      id: 2,
      title: "Microsoft Office Specialist (MOS)",
      subtitle: "Microsoft Access",
      issuer: "Microsoft"
    },
    {
      id: 3,
      title: "Introduction to Cybersecurity",
      subtitle: "Cybersecurity Fundamentals",
      issuer: "Cisco"
    }
  ];

  const certifications = data && data.length > 0 ? data : defaultCertifications;

  return (
    <section
      id="certifications"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-5 text-center"
    >
      <div className="relative bg-white text-black rounded-lg shadow-2xl shadow-white/10 p-6 sm:p-8 lg:p-10 xl:p-12 max-w-6xl mx-auto hover:shadow-3xl hover:shadow-white/20 transform hover:-translate-y-2 transition-all duration-500 border border-gray-200">
        <div className="relative z-10">
          <div className="inline-block mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-black font-bold mb-2">
              Certifications
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-black rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 text-left"
              >
                <h3 className="text-lg sm:text-xl font-bold text-black mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">
                  {cert.subtitle}
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <span className="font-semibold">Issued by:</span>
                  <span>{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
