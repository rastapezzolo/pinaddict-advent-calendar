import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const SuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const session = urlParams.get('session_id');

    if (success === 'true' && session) {
      setSessionId(session);
      clearCart();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <svg className="w-24 h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pagamento Completato!
          </h1>
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 mb-2">
              Grazie per il tuo ordine! 🎉
            </p>
            <p className="text-gray-600">
              Il tuo calendario dell'avvento Pin Addict è in arrivo!
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Cosa Succede Ora?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">Email di Conferma</h3>
                  <p className="text-gray-600 text-sm">
                    Riceverai un'email con tutti i dettagli del tuo ordine entro pochi minuti.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">Preparazione Ordine</h3>
                  <p className="text-gray-600 text-sm">
                    Il tuo calendario verrà preparato con cura dal nostro team.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">Spedizione</h3>
                  <p className="text-gray-600 text-sm">
                    Riceverai una notifica con il tracking non appena il pacco sarà spedito.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-1">ID Ordine:</p>
              <p className="font-mono text-xs text-gray-800 break-all">{sessionId}</p>
            </div>
          )}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              L'Avventura Pop Culture Inizia!
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              24 giorni di sorprese ti aspettano. Ogni pin è un pezzo unico di cultura pop!
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Preparati per il countdown!
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Torna alla Home
            </Link>
            <Link
              to="/contact"
              className="flex-1 text-center bg-white border-2 border-purple-600 text-purple-600 font-bold py-4 px-6 rounded-lg hover:bg-purple-50 transition-all duration-300"
            >
              Contattaci
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Hai domande sul tuo ordine?{' '}
              <Link
                to="/contact"
                className="text-purple-600 hover:text-purple-800 font-semibold underline"
              >
                Contatta il nostro supporto
              </Link>
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-semibold text-gray-800 text-sm">Spedizione Tracciata</h4>
            <p className="text-xs text-gray-600 mt-1">Monitora il tuo pacco in tempo reale</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-gray-800 text-sm">Design Esclusivi</h4>
            <p className="text-xs text-gray-600 mt-1">Ogni pin è un'opera d'arte</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md text-center">
            <div className="text-3xl mb-2">💌</div>
            <h4 className="font-semibold text-gray-800 text-sm">Supporto Dedicato</h4>
            <p className="text-xs text-gray-600 mt-1">Siamo qui per aiutarti</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
