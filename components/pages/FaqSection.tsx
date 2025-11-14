import React from 'react';

const FAQSection = () => {
  const faqs = [
    {
      id: 1,
      question: 'Quando verrà spedito il mio calendario?',
      answer: 'Tutti gli ordini vengono spediti entro 24 ore. Riceverai appena disponibili le informazioni di tracciamento.',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconBg: 'bg-red-600',
      iconColor: 'text-red-600',
    },
    {
      id: 2,
      question: 'I pin sono davvero casuali?',
      answer: 'Sì! Ogni calendario contiene 24 pin unici provenienti da vari temi della cultura pop. Ogni scatola è diversa, rendendola una vera esperienza a sorpresa.',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-600',
      iconBg: 'bg-green-700',
      iconColor: 'text-green-700',
    },
    {
      id: 3,
      question: 'Posso comprarne più di uno?',
      answer: 'A causa dello stock limitato (solo 5 disponibili), consigliamo di ordinare rapidamente. Ogni cliente può acquistare al massimo 1 calendario.',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconBg: 'bg-red-600',
      iconColor: 'text-red-600',
    },
    {
      id: 4,
      question: 'Qual è la vostra politica di reso?',
      answer: 'A causa della natura limitata ed esclusiva di questo prodotto, tutte le vendite sono definitive. Tuttavia, se ricevi un articolo danneggiato, lo sostituiremo immediatamente.',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-600',
      iconBg: 'bg-green-700',
      iconColor: 'text-green-700',
    },
  ];

  return (
    <section className="w-full px-4 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-green-800">
          Domande?
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${faq.bgColor} rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 border-l-4 ${faq.borderColor} shadow-md hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Question with Icon */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                {/* Question Mark Icon */}
                <div className={`${faq.iconBg} w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-bold text-base sm:text-lg">?</span>
                </div>
                
                {/* Question Text */}
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${faq.iconColor} leading-tight`}>
                  {faq.question}
                </h3>
              </div>

              {/* Answer */}
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed pl-10 sm:pl-12">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;