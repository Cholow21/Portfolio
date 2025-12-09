import "./contact.css";

export default function Contact({ data }) {
  const contactInfo = [
    { label: "Email", value: data.email, link: `mailto:${data.email}`, isClickable: true },
    { label: "Instagram", value: data.instagram, link: `https://www.instagram.com/tiyolow/')}`, isClickable: true },
    { label: "Facebook", value: data.facebook, link: "https://www.facebook.com/Cholo.Clemente21", isClickable: true },
    { label: "Phone", value: data.phone, link: null, isClickable: false },
    { label: "Address", value: data.address, link: null, isClickable: false },
  ];

  return (
    <footer id="contact" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-5 text-center overflow-hidden bg-black/90">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <div className="h-1 w-24 sm:w-32 bg-white rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg px-4">Feel free to reach out for collaborations or just a friendly chat!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className={`group bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-6 transition-all duration-300 ${
                item.isClickable 
                  ? 'hover:bg-white/10 hover:border-white/30 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer' 
                  : 'cursor-default'
              }`}
            >
              {item.isClickable ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="text-gray-400 font-semibold text-xs sm:text-sm mb-2">{item.label}</div>
                  <div className="text-white font-medium text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300 underline decoration-transparent group-hover:decoration-gray-300 break-words">
                    {item.value}
                  </div>
                </a>
              ) : (
                <>
                  <div className="text-gray-400 font-semibold text-xs sm:text-sm mb-2">{item.label}</div>
                  <div className="text-white font-medium text-sm sm:text-base break-words">{item.value}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            © 2025 Marshal Cholo Clemente. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
