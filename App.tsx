
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import ContactPage from './components/pages/ContactPage';
import CartPage from './components/pages/CartPage';
import SuccessPage from './components/pages/SuccessPage';
import PrivacyPage from './components/pages/PrivacyPage';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import CookieBanner from './components/CookieBanner';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </CartProvider>
  );
};

export default App;
