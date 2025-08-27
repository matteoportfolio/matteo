import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Funzione per inizializzare React nella hero section
export function initReactHero() {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    // Crea un container per React
    const reactContainer = document.createElement('div');
    reactContainer.id = 'react-hero-root';
    
    // Sostituisce il contenuto esistente
    heroContent.innerHTML = '';
    heroContent.appendChild(reactContainer);
    
    // Renderizza il componente React
    const root = createRoot(reactContainer);
    root.render(<App />);
  }
}

// Esporta per uso globale
if (typeof window !== 'undefined') {
  (window as any).initReactHero = initReactHero;
}