
import React from 'react';
import { Link } from 'react-router-dom';
import SocialButtons from './SocialButtons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#43d3b0] text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <SocialButtons />
        <p className="font-semibold">&copy; {new Date().getFullYear()} Pin Addict. Tutti i diritti riservati.</p>
        <p className="text-sm text-teal-200 mt-2">Il tuo negozio di spille per le feste!</p>
        <div className="mt-4 pt-4 border-t border-teal-400">
          <Link
            to="/privacy"
            className="text-sm text-white hover:text-teal-200 underline transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
