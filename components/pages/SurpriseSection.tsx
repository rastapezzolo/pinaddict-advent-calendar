import React from 'react';

const SurpriseSection = () => {
  const features = [
    { text: 'Metallo di Alta Qualità', icon: '✓' },
    { text: 'Colori Vivaci', icon: '✓' },
    { text: 'Fissaggio Sicuro', icon: '✓' },
  ];

  return (
    <section className="w-full md:w-3/4 mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-red-700/10 to-green-700/10 rounded-3xl md:rounded-[3rem] p-8 sm:p-10 md:p-16 border-4 border-yellow-500 shadow-xl">
          {/* Icon Circle */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="bg-yellow-600 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl">
              <svg 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-red-600 leading-tight">
            Ogni Pin è una Sorpresa!
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-center text-gray-700 leading-relaxed mb-8 md:mb-10 max-w-5xl mx-auto px-2">
            Ogni giorno porta un nuova pin misteriosa. <br />Dai supereroi ai 
            personaggi anime, dai cartoni classici ai successi moderni - non sai mai quale 
            tesoro ti aspetta dietro ogni porta.<br /> Perfetto per collezionisti ed appassionati di 
            cultura pop!
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 sm:gap-3"
              >
                {/* Check Icon */}
                <div className="bg-green-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Feature Text */}
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurpriseSection;