import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  timestamp: number;
}

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      try {
        const parsed: CookieConsent = JSON.parse(consent);
        setAnalyticsEnabled(parsed.analytics);
        if (parsed.analytics) {
          console.log('Analytics enabled');
        }
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consent));
    setAnalyticsEnabled(analytics);

    if (analytics) {
      console.log('User accepted analytics');
    }

    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent(true);
  };

  const rejectAll = () => {
    saveConsent(false);
  };

  const savePreferences = () => {
    saveConsent(analyticsEnabled);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-auto" onClick={() => !showDetails && rejectAll()} />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full pointer-events-auto mb-4 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Il tuo consenso sui cookie
          </h3>
        </div>
        <div className="px-6 py-6">
          {!showDetails ? (
            <div>
              <p className="text-gray-700 mb-4">
                Utilizziamo cookie tecnici essenziali per il funzionamento del carrello e, con il tuo consenso,
                cookie analitici per migliorare la tua esperienza di navigazione.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                I dati di pagamento sono gestiti in modo sicuro da Stripe.
                Per maggiori informazioni, consulta la nostra{' '}
                <Link
                  to="/privacy"
                  className="text-purple-600 hover:text-purple-800 underline font-semibold"
                  onClick={() => setIsVisible(false)}
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                >
                  Accetta Tutti
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Rifiuta Tutti
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 bg-white border-2 border-purple-600 text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-300"
                >
                  Personalizza
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-6">
                Puoi scegliere quali cookie accettare. I cookie tecnici sono necessari per il funzionamento del sito.
              </p>
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Cookie Tecnici (Necessari)
                    </h4>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Sempre attivi
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Questi cookie sono essenziali per il funzionamento del sito (es. carrello).
                    Utilizziamo localStorage, non cookie tradizionali.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="analytics-toggle"
                        checked={analyticsEnabled}
                        onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="analytics-toggle" className="ml-3 font-bold text-gray-800 cursor-pointer">
                        Cookie Analitici (Opzionali)
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Ci aiutano a capire come gli utenti interagiscono con il sito per migliorare l'esperienza.
                    Include Google Analytics (quando implementato).
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>ℹ️ Nota:</strong> Durante il pagamento, Stripe può impostare i propri cookie.
                    Consulta la <a href="https://stripe.com/cookies-policy/legal" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Cookie Policy di Stripe</a>.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                >
                  Salva Preferenze
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Indietro
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
