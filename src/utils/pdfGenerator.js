// pdfGenerator.js
import { PDFDocument, rgb } from 'pdf-lib';

// === Fonction pour traiter le logo (corrigée) ===
async function processLogo(logoData) {
  if (!logoData) return null;

  // Si c'est déjà une URL base64
  if (typeof logoData === 'string' && logoData.startsWith('data:')) {
    return logoData;
  }

  // Si c'est un fichier uploadé (File)
  if (logoData instanceof File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(logoData);
    });
  }

  console.warn('Type de logo non supporté:', typeof logoData);
  return null;
}

// === Fonction pour dessiner une image ===
async function drawImage(pdfDoc, page, imageData, x, y, width, height) {
  try {
    const dataUrl = await processLogo(imageData);
    if (!dataUrl) {
      console.warn('Aucune donnée image valide fournie');
      return false;
    }

    const res = await fetch(dataUrl);
    const imageBytes = await res.arrayBuffer();

    const image = dataUrl.startsWith('data:image/png')
      ? await pdfDoc.embedPng(imageBytes)
      : await pdfDoc.embedJpg(imageBytes);

    page.drawImage(image, { x, y, width, height });
    return true;
  } catch (error) {
    console.error('[PDF Generator] Erreur image:', error);
    return false;
  }
}

// === Fonction utilitaire pour télécharger un PDF ===
function downloadPDF(pdfBytes, filename) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// === Exemple : Dessin face avant ===
async function drawCardFront(pdfDoc, page, formData, templateId) {
  page.drawText(formData.name || 'Nom', {
    x: 20,
    y: 120,
    size: 12,
    color: rgb(0, 0, 0),
  });

  page.drawText(formData.title || 'Titre', {
    x: 20,
    y: 100,
    size: 10,
    color: rgb(0.2, 0.2, 0.2),
  });

  if (formData.logo) {
    await drawImage(pdfDoc, page, formData.logo, 140, 90, 40, 40);
  }
}

// === Exemple : Dessin face arrière ===
async function drawCardBack(pdfDoc, page, formData, templateId) {
  page.drawText(formData.phone || 'Téléphone', {
    x: 20,
    y: 120,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText(formData.email || 'Email', {
    x: 20,
    y: 100,
    size: 10,
    color: rgb(0, 0, 0),
  });
}

// === Fonction principale d’export ===
export const generateAndDownloadPDF = async (formData, templateId) => {
  try {
    if (!formData || !templateId) {
      throw new Error('Données manquantes: formData ou templateId non fournis');
    }

    const pdfDoc = await PDFDocument.create();
    const width = 85 * 2.83465; // 85 mm en points
    const height = 55 * 2.83465; // 55 mm en points

    const frontPage = pdfDoc.addPage([width, height]);
    await drawCardFront(pdfDoc, frontPage, formData, templateId);

    const backPage = pdfDoc.addPage([width, height]);
    await drawCardBack(pdfDoc, backPage, formData, templateId);

    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, `business-card-${Date.now()}.pdf`);

    console.log('[PDF Generator] PDF généré avec succès');
    return true;
  } catch (error) {
    console.error('[PDF Generator] Échec critique:', {
      error: error.message,
      stack: error.stack,
      data: { templateId, formData: Object.keys(formData || {}) },
    });
    return false;
  }
};
