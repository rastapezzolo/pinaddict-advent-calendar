import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: '📅',
      title: '24 Giorni di Gioia',
      description: 'Sorpresa quotidiana dal 1° dicembre alla Vigilia di Natale',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-600',
    },
    {
      id: 2,
      icon: '⭐',
      title: 'Design Esclusivi',
      description: 'Pin in edizione limitata che non troverai da nessun\'altra parte',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-700',
    },
    {
      id: 3,
      icon: '💻',
      title: 'Icone Pop Culture',
      description: 'Dalle serie TV, film e cartoni animati più amati',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-600',
    },
    {
      id: 4,
      icon: '🏅',
      title: 'Qualità Premium',
      description: 'Pin in metallo di alta qualità con colori vivaci',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-600',
    },
  ];

  return (
    <section className="w-full px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgColor} rounded-3xl p-6 md:p-8 text-center transition-transform hover:scale-105 duration-300`}
            >
              {/* Icon Circle */}
              <div className="flex justify-center mb-6">
                <div
                  className={`${feature.iconBg} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg`}
                >
                  <span className="text-3xl md:text-4xl" role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;