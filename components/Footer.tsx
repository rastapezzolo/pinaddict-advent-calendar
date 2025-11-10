
import React from 'react';
import SocialButtons from './SocialButtons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#43d3b0] text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <SocialButtons></SocialButtons>
        <p className="font-semibold">&copy; {new Date().getFullYear()} Pin Addict. Tutti i diritti riservati.</p>
        <p className="text-sm text-teal-200 mt-2">Il tuo negozio di spille per le feste!</p>
      </div>
    </footer>
  );
};

export default Footer;
