// TransactionPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { generateAndDownloadPDF } from '../../utils/pdfGenerator';
import './TransactionPage.css';

export default function TransactionPage() {
  const { method } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, formData, templateId, action } = location.state || {};
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const methodNames = {
    'orange-money': 'Orange Money',
    'mtn-money': 'MTN Money',
    'carte-bancaire': 'Carte Bancaire'
  };

  const displayName = methodNames[method] || method;

  // Utiliser useEffect pour gérer la redirection une fois que le paiement est un succès
  // Ceci évite le "Cannot remove child" en s'assurant que le composant a eu le temps de se mettre à jour
  useEffect(() => {
    let timeoutId;
    if (isSuccess) {
      timeoutId = setTimeout(() => {
        // Rediriger vers la page de confirmation avec les données de transaction
        navigate('/confirmation-paiement', {
          state: {
            amount,
            method: displayName,
            action,
            formData,
            templateId
          }
        });
      }, 3000); // Redirection après 3 secondes
    }
    // Fonction de nettoyage pour annuler la redirection si le composant est démonté
    return () => clearTimeout(timeoutId);
  }, [isSuccess, amount, displayName, action, formData, templateId, navigate]);

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      console.log('Validation des données:', {
        formData: Object.keys(formData || {}),
        templateId,
        amount
      });

      if (action === 'download') {
        console.log('Tentative de génération PDF...');
        const success = await generateAndDownloadPDF(formData, templateId);
        if (!success) {
          throw new Error('Échec de la génération du PDF');
        }
      }
      
      // Simuler un délai de traitement de l'API
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // Mettre à jour l'état de succès une fois toutes les actions terminées
      setIsProcessing(false);
      setIsSuccess(true);
    } catch (err) {
      console.error('Erreur lors du traitement du paiement:', err);
      setError(err.message || 'Une erreur est survenue.');
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setIsProcessing(true);
      setError(null);
      
      // Simuler l'envoi du code par SMS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      setStep(2);
    } else {
      handlePaymentSuccess();
    }
  };
  
  return (
    <div className="transactionContainer">
      {!isSuccess ? (
        <form className="transactionForm" onSubmit={handleSubmit}>
          <h2>Paiement via {displayName}</h2>
          <p className="amount">Montant: <strong>{amount?.toLocaleString()} fcfa</strong></p>
          
          {error && <div className="error-message">{error}</div>}

          {/* Étape 1: Entrer le numéro de téléphone */}
          {step === 1 && (
            <div className="formGroup">
              <label>
                Numéro de téléphone:
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: 699123456"
                  required
                  pattern="[0-9]{9}"
                  title="9 chiffres"
                />
              </label>
            </div>
          )}

          {/* Étape 2: Entrer le code de confirmation */}
          {step === 2 && (
            <div className="formGroup">
              <label>
                Code de confirmation:
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez le code reçu par SMS"
                  required
                  pattern="[0-9]{6}"
                  title="6 chiffres reçu par SMS"
                />
              </label>
              <p className="infoText">Un code de confirmation a été envoyé au {phone}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            className="confirmButton"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="button-loading">
                <span className="spinner"></span>
                {step === 1 ? 'Envoi en cours...' : 'Traitement...'}
              </span>
            ) : (
              step === 1 ? 'Envoyer le code' : 'Confirmer le paiement'
            )}
          </button>
        </form>
      ) : (
        <div className="successMessage">
          <div className="checkmark">✓</div>
          <h2>Paiement réussi !</h2>
          <p>Votre transaction de {amount?.toLocaleString()} fcfa a été effectuée avec succès.</p>
          {action === 'download' && (
            <p>Votre téléchargement devrait commencer automatiquement...</p>
          )}
          <p>Redirection en cours...</p>
        </div>
      )}
    </div>
  );
}
