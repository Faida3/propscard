import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreviewPageStyles.css';
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
    component: BusinessCardRecto1,
    backComponent: BusinessCardVerso1,
    price: "500 fcfa"
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

export default function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, templateId } = location.state || {};
  
  // Utilisez l'ID pour trouver le modèle correct dans la liste
  const template = allTemplates.find(t => t.id === templateId);
  const TemplateFront = template?.component;
  const TemplateBack = template?.backComponent;

  if (!template || !formData) {
    return <div>Données manquantes</div>;
  }

  const handleDownload = () => {
    navigate('/payment-method', {
      state: {
        totalPrice: parseInt(template.price.replace(/\D/g, '')),
        formData,
        templateId,
        action: 'download'
      }
    });
  };

  const handleOrder = () => {
    // CORRECTION : On passe uniquement l'ID du modèle et les données sérialisables.
    // L'objet `template` complet est non-sérialisable à cause des composants React.
    navigate('/print-options', {
      state: {
        cardData: formData,
        templateId, // <-- Correction ici, on passe l'ID
        action: 'order'
      }
    });
  };

  return (
    <div className="preview-container">
      <div className="card-display">
        <div className="card-side">
          <h3>Recto de votre carte</h3>
          <TemplateFront data={formData} />
        </div>
        <div className="card-side">
          <h3>Verso de votre carte</h3>
          <TemplateBack data={formData} />
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="custom-button download-btn" onClick={handleDownload}>
          Télécharger le PDF
        </button>
        <button className="custom-button order-btn" onClick={handleOrder}>
          Commander l'impression
        </button>
      </div>
    </div>
  );
}
