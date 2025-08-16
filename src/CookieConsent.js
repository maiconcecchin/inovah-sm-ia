// src/CookieConsent.js
import React, { useState, useEffect } from 'react';

function CookieConsent() {
  const [mostrarBanner, setMostrarBanner] = useState(false);

  useEffect(() => {
    const consentimento = localStorage.getItem('cookie-consent');
    if (!consentimento) {
      setMostrarBanner(true);
    }
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setMostrarBanner(false);
    // Aqui você pode ativar Google Analytics ou outro script
  };

  if (!mostrarBanner) return null;

  return (
    <div style={estilos.banner}>
      <p style={estilos.texto}>
        Usamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa política de privacidade.
      </p>
      <button style={estilos.botao} onClick={aceitarCookies}>
        Aceitar
      </button>
    </div>
  );
}

const estilos = {
  banner: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '500px',
    background: '#111827',
    color: '#fff',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column', // texto em cima, botão embaixo
    gap: '12px',
    alignItems: 'center',
    zIndex: 1000,
    fontSize: '14px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  texto: {
    margin: 0,
  },
  botao: {
    background: '#10b981',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default CookieConsent;
