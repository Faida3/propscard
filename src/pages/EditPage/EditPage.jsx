import React, { useState } from 'react';
import './EditPageStyles.css';
import { useNavigate, useLocation } from 'react-router-dom';
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
    title: "Design élégant or",
    price: "750 fcfa",
    component: Template2Front,
    backComponent: Template2Back
  },

];

export default function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId } = location.state || {};

  const template = allTemplates.find(t => t.id === templateId);
  
  const getInitialFormData = () => {
    const baseFields = {
      name: '',
      jobTitle: '',
      phone: '',
      email: '',
      location: '',
      website: '',
      companyName: '',
      tagline: '',
      logo: ''
    };

    switch(templateId) {
      case 1: // BusinessCard1
        return {
          ...baseFields,
          addressLine1: '',
          addressLine2: ''
        };
      case 2: // BusinessCard2
        return {
          ...baseFields,
          address: '',
          companyDetails: "YOUR COMPANY NAME\nTEL | CITY"
        };
      case 3: // BusinessCard3
        return baseFields;
      case 4: // Template2
        return {
          ...baseFields,
          companyDetails: "YOUR COMPANY NAME\nTEL | CITY"
        };
      case 5: // Template1
        return baseFields;
      default:
        return baseFields;
    }
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  navigate("/preview", { 
    state: { 
      formData: { ...formData }, // Données du formulaire
      templateId: template.id    // ID seulement (pas le composant)
    } 
  });
};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderFormFields = () => {
    switch(templateId) {
      case 1: // BusinessCard1
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Adresse (ligne 1)</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Adresse (ligne 2)</label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Nom de l'entreprise</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Slogan</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} />
            </div>
          </>
        );
      
      case 2: // BusinessCard2
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Adresse complète</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Détails entreprise</label>
              <textarea name="companyDetails" value={formData.companyDetails} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Slogan</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} />
            </div>
          </>
        );
      
      case 3: // BusinessCard3
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Localisation</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Site web</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </>
        );
      
      case 4: // Template2
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Détails entreprise</label>
              <textarea name="companyDetails" value={formData.companyDetails} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Slogan</label>
              <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Site web</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </>
        );
      
      case 5: // Template1
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Localisation</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
          </>
        );
      
      default:
        return (
          <>
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Titre professionnel</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </>
        );
    }
  };

  const TemplatePreview = template?.component;
  const TemplateBackPreview = template?.backComponent;

  if (!template) {
    return <div>Template non trouvé</div>;
  }

  return (
    <div className="edit-page-container">
      <div className="template-preview">
        <h3>Aperçu de votre carte</h3>
        <div className="card-front">
          <TemplatePreview data={formData} />
        </div>
        <div className="card-back">
          <TemplateBackPreview data={formData} />
        </div>
      </div>
      
      <div className="edit-form-container">
        <h2>Personnalisez votre carte</h2>
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          
          <div className="form-group">
            <label>Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {formData.logo && (
              <div className="logo-preview">
                <img src={formData.logo} alt="Logo preview" width="100" />
              </div>
            )}
          </div>
          
          <button type="submit" className="submit-btn">
            Prévisualiser la carte
          </button>
        </form>
      </div>
    </div>
  );
}