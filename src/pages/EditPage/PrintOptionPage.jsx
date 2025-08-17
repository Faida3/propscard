import React, { useState } from 'react';
import './PrintOptionPageStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessCardRecto1 from '../../components/CardTemplates/BusinessCardRecto1';
import BusinessCardVerso1 from '../../components/CardTemplates/BusinessCardVerso1';
import BusinessCardRecto2 from '../../components/CardTemplates/BusinessCardRecto2';
import BusinessCardVerso2 from '../../components/CardTemplates/BusinessCardVerso2';
import BusinessCardRecto3 from '../../components/CardTemplates/BusinessCardRecto3';
import BusinessCardVerso3 from '../../components/CardTemplates/BusinessCardVerso3';
import Template1Front from '../../components/CardTemplates/Template1Front';
import Template2Front from '../../components/CardTemplates/Template2Front';
import Template1Back from '../../components/CardTemplates/Template1Back';
import Template2Back from '../../components/CardTemplates/Template2Back';

// IMPORTANT : Cette liste de modèles doit être présente sur toutes les pages
// qui en ont besoin pour éviter de passer des objets non-sériables.
const allTemplates = [
  {
    id: 1,
    title: "Design minimaliste noir",
    price: "500 fcfa",
    component: BusinessCardRecto1,
    backComponent: BusinessCardVerso1
  },
  {
    id: 2,
    title: "Design créatif pour artiste",
    price: "750 fcfa",
    component: BusinessCardRecto2,
    backComponent: BusinessCardVerso2
  },
  {
    id: 3,
    title: "Design minimaliste bleu",
    price: "500 fcfa",
    component: BusinessCardRecto3,
    backComponent: BusinessCardVerso3
  },
  {
    id: 4,
    title: "Design créatif pour artiste",
    price: "750 fcfa",
    component: Template1Front,
    backComponent: Template1Back
  },
  {
    id: 5,
    title: "Design moderne",
    price: "1000 fcfa",
    component: Template2Front,
    backComponent: Template2Back
  },
];


const PrintOptionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // CORRECTION : On récupère l'ID et non l'objet complet
  const { cardData, templateId, action } = location.state || {};

  // Utilisez l'ID pour retrouver l'objet template complet sur cette page
  const template = allTemplates.find(t => t.id === templateId);

  const [quantity, setQuantity] = useState(100);
  const [format, setFormat] = useState('standard');

  if (!template || !cardData) {
    return <div>Données manquantes ou template non trouvé.</div>
  }

  // Prix de base + prix d'impression
  const designPrice = parseInt(template.price.replace(/\D/g, ''));
  const printPricePerCard = 10; // Exemple: 10 fcfa par carte
  const totalPrice = designPrice + (quantity * printPricePerCard);

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        cardData,
        templateId, // On passe l'ID
        quantity,
        format,
        totalPrice
      }
    });
  };
  
  const TemplateFrontPreview = template.component;
  const TemplateBackPreview = template.backComponent;

  return (
    <div className="print-options-page">
      <h1>Options d'impression</h1>

      <div className="card-preview">
        <h3>Aperçu de votre carte</h3>
        <div className="card-front">
          <TemplateFrontPreview data={cardData} />
        </div>
        <div className="card-back">
          <TemplateBackPreview data={cardData} />
        </div>
      </div>

      <div className="options-form">
        <div className="form-group">
          <label>Quantité:</label>
          <input
            type="number"
            min="50"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="standard">Standard (85×55 mm)</option>
            <option value="square">Carré (55×55 mm)</option>
            <option value="slim">Slim (85×35 mm)</option>
          </select>
        </div>

        <div className="price-summary">
          <p>Prix conception: {designPrice} fcfa</p>
          <p>Prix impression: {quantity} × {printPricePerCard} fcfa = {quantity * printPricePerCard} fcfa</p>
          <h3>Total: {totalPrice.toLocaleString()} fcfa</h3>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Passer au paiement
        </button>
      </div>
    </div>
  );
};

export default PrintOptionsPage;
