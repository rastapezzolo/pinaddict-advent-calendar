import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduzione</h2>
            <p className="text-gray-700 mb-4">
              Pin Addict ("noi", "nostro") si impegna a proteggere la privacy dei propri clienti.
              Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali
              in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'UE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Titolare del Trattamento</h2>
            <p className="text-gray-700 mb-4">
              Pin Addict<br />
              Email: info@pinaddict.it
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Dati Raccolti</h2>
            <p className="text-gray-700 mb-4">Raccogliamo le seguenti tipologie di dati:</p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.1 Dati forniti direttamente</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Email:</strong> Per conferme d'ordine e comunicazioni</li>
              <li><strong>Indirizzo di spedizione:</strong> Via, città, provincia, CAP</li>
              <li><strong>Dettagli ordine:</strong> Prodotti acquistati, quantità, prezzo</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">3.2 Dati tecnici</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>localStorage:</strong> Utilizziamo lo storage locale del browser per salvare temporaneamente il contenuto del carrello. Questi dati rimangono sul tuo dispositivo.</li>
              <li><strong>Cookie analitici (futuri):</strong> Prevediamo di implementare Google Analytics per migliorare l'esperienza utente. Richiederemo il tuo consenso prima di attivarli.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Giuridica del Trattamento</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Esecuzione del contratto:</strong> Per elaborare e spedire il tuo ordine</li>
              <li><strong>Consenso:</strong> Per l'invio di comunicazioni marketing (se richiesto)</li>
              <li><strong>Legittimo interesse:</strong> Per migliorare i nostri servizi tramite analytics (con consenso)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Finalità del Trattamento</h2>
            <p className="text-gray-700 mb-4">Utilizziamo i tuoi dati per:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Elaborare e gestire i tuoi ordini</li>
              <li>Inviare conferme d'ordine e aggiornamenti sulla spedizione</li>
              <li>Fornire assistenza clienti</li>
              <li>Migliorare l'esperienza sul nostro sito (analytics, solo con consenso)</li>
              <li>Adempiere agli obblighi legali (es. fatturazione)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Condivisione dei Dati</h2>
            <p className="text-gray-700 mb-4">I tuoi dati vengono condivisi solo con:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Stripe:</strong> Per l'elaborazione sicura dei pagamenti. Stripe è conforme PCI-DSS e GDPR. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Privacy Policy Stripe</a></li>
              <li><strong>Corrieri:</strong> Per la spedizione fisica dei prodotti</li>
              <li><strong>AWS (Amazon Web Services):</strong> Per l'hosting dell'infrastruttura</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Non vendiamo né cediamo i tuoi dati a terze parti per scopi di marketing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conservazione dei Dati</h2>
            <p className="text-gray-700 mb-4">
              Conserviamo i tuoi dati personali solo per il tempo necessario a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Adempiere agli obblighi contrattuali e legali (10 anni per dati fiscali)</li>
              <li>Gestire eventuali reclami o contestazioni</li>
              <li>I dati nel localStorage vengono conservati sul tuo dispositivo fino a quando non li cancelli manualmente</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. I Tuoi Diritti (GDPR)</h2>
            <p className="text-gray-700 mb-4">
              Hai diritto a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Accesso:</strong> Ottenere una copia dei tuoi dati personali</li>
              <li><strong>Rettifica:</strong> Correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione:</strong> Richiedere la cancellazione dei tuoi dati ("diritto all'oblio")</li>
              <li><strong>Limitazione:</strong> Limitare il trattamento in determinate circostanze</li>
              <li><strong>Portabilità:</strong> Ricevere i tuoi dati in formato strutturato</li>
              <li><strong>Opposizione:</strong> Opporti al trattamento per marketing diretto</li>
              <li><strong>Revoca del consenso:</strong> Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Per esercitare questi diritti, contattaci a: <a href="mailto:info@pinaddict.it" className="text-purple-600 hover:text-purple-800 underline">info@pinaddict.it</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookie</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">9.1 Cookie tecnici (sempre attivi)</h3>
            <p className="text-gray-700 mb-4">
              Utilizziamo localStorage (non cookie veri e propri) per salvare il carrello.
              Questi sono necessari per il funzionamento del sito e non richiedono consenso.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">9.2 Cookie analitici (opzionali)</h3>
            <p className="text-gray-700 mb-4">
              Prevediamo di utilizzare Google Analytics per analizzare l'utilizzo del sito.
              Questi cookie verranno attivati solo con il tuo consenso esplicito.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">9.3 Cookie di terze parti</h3>
            <p className="text-gray-700 mb-4">
              Stripe può impostare cookie durante il processo di pagamento.
              Consulta la <a href="https://stripe.com/cookies-policy/legal" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Cookie Policy di Stripe</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Sicurezza</h2>
            <p className="text-gray-700 mb-4">
              Implementiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Crittografia SSL/TLS per tutte le comunicazioni</li>
              <li>Server sicuri su AWS con firewall e monitoraggio</li>
              <li>Nessun dato di pagamento salvato sui nostri server (gestito da Stripe)</li>
              <li>Accesso limitato ai dati personali solo al personale autorizzato</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Trasferimento Dati Extra-UE</h2>
            <p className="text-gray-700 mb-4">
              I tuoi dati possono essere trasferiti a fornitori di servizi situati negli Stati Uniti
              (AWS, Stripe). Questi trasferimenti sono protetti da:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Clausole contrattuali standard approvate dalla Commissione Europea</li>
              <li>Certificazioni di conformità GDPR dei fornitori</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Minori</h2>
            <p className="text-gray-700 mb-4">
              I nostri servizi non sono destinati a minori di 16 anni.
              Non raccogliamo consapevolmente dati di minori senza il consenso dei genitori.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Modifiche alla Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              Possiamo aggiornare questa informativa periodicamente.
              La data dell'ultimo aggiornamento è indicata in cima alla pagina.
              Modifiche sostanziali verranno comunicate via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contatti</h2>
            <p className="text-gray-700 mb-4">
              Per qualsiasi domanda su questa Privacy Policy o per esercitare i tuoi diritti:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> <a href="mailto:info@pinaddict.it" className="text-purple-600 hover:text-purple-800 underline">info@pinaddict.it</a>
            </p>
            <p className="text-gray-700 mt-6">
              Hai anche il diritto di presentare un reclamo all'autorità di controllo competente
              (Garante per la Protezione dei Dati Personali: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">www.garanteprivacy.it</a>).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
