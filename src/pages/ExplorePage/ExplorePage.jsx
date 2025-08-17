import React from 'react';
import './ExplorePageStyles.css';
import { FaBeer } from 'react-icons/fa';
import img1 from '../../assets/images/fa2.PNG';
import img2 from '../../assets/images/fb1.PNG';
import img3 from '../../assets/images/fo.PNG';
import img4 from '../../assets/images/fg.PNG';
import img5 from '../../assets/images/fi.PNG';
import img6 from '../../assets/images/ft.PNG';
import img7 from '../../assets/images/fy.PNG';
import img8 from '../../assets/images/fz.PNG';
import img9 from '../../assets/images/fs.PNG';
import img10 from '../../assets/images/fab.PNG';
import img11 from '../../assets/images/fe.PNG';
import img12 from '../../assets/images/fk.PNG';
import { navLinks } from '../../constants/NavLinks';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom';

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
];

export default function ExplorePage() {
  const navigate = useNavigate();

  const handleClick = (design) => {
    // CORRECTION : On passe uniquement l'ID du modèle au lieu de l'objet complet
    // pour éviter les erreurs de sérialisation.
    navigate("/edit", {
      state: {
        templateId: design.id
      }
    });
  };

  return (
    <div className="all">
      <Navbar navLinks={navLinks} />
      <div className="products-page">
        <h2>Nos Modèles de Cartes de Visite</h2>
        <p className="subtitle">Choisissez un design qui représente votre entreprise</p>

        <div className="card-list">
          {allTemplates.map((design) => (
            <div className="card-item" key={design.id} style={{ alignSelf: 'start' }}>
              <div className="card-preview" onClick={() => handleClick(design)}>
                <design.component />
              </div>
              <div className="card-details">
                <h3>{design.title}</h3>
                <p className="price">{design.price}</p>
                <button className="custom-button" onClick={() => handleClick(design)}>
                  Sélectionner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
