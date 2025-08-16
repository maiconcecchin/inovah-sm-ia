// src/CookieConsent.js
import React, { useState, useEffect } from 'react';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
    // Aqui você pode ativar Google Analytics ou outro script
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        Usamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa política de privacidade.
      </p>
      <button style={styles.button} onClick={handleAccept}>
        Aceitar
      </button>
    </div>
  );
}

const styles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: '#111827',
    color: '#fff',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    fontSize: '14px',
  },
  text: {
    margin: 0,
    maxWidth: '80%',
  },
  button: {
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
