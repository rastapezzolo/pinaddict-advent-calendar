
import React from 'react';
import SocialButtons from './SocialButtons';
import type { Page } from '../types';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-[#43d3b0] text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <SocialButtons></SocialButtons>
        <p className="font-semibold">&copy; {new Date().getFullYear()} Pin Addict. Tutti i diritti riservati.</p>
        <p className="text-sm text-teal-200 mt-2">Il tuo negozio di spille per le feste!</p>
        <div className="mt-4 pt-4 border-t border-teal-400">
          <button
            onClick={() => navigateTo('privacy')}
            className="text-sm text-white hover:text-teal-200 underline transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
