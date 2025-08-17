import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PayementConfirmation.css';

export default function PaymentConfirmation() {
  const location = useLocation();
  const { amount, method, action, formData, templateId } = location.state || {};


return (
  <div className="confirmationContainer">
    <div className="confirmationCard">
      <div className="checkmark">✓</div>
      <h1>Paiement Réussi !</h1>
      
      {action === 'download' ? (
        <>
          <p>Votre carte de visite a été générée avec succès.</p>
          <p>Montant: <strong>{amount?.toLocaleString()} fcfa</strong> via {method}</p>
          <p>Un exemplaire a été envoyé à votre email.</p>
        </>
      ) : (
        <>
          {/* Ce bloc s'exécutera si action est 'order' */}
          <p>Votre commande de cartes a été confirmée.</p>
          <p>Montant: <strong>{amount?.toLocaleString()} fcfa</strong> via {method}</p>
          <p>Vous recevrez un email de confirmation sous peu.</p>
        </>
      )}
        <div className="actions">
          <Link to="/" className="homeButton">
            Retour à l'accueil
          </Link>
          <Link 
            to="/preview" 
            className="exploreButton"
            state={{ formData, templateId }}
          >
            Voir à nouveau ma carte
          </Link>
        </div>
      </div>
    </div>
  );
}