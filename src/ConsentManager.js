import React, { useEffect, useState } from "react";

function ConsentManager() {
  const [consentido, setConsentido] = useState(() => {
    return localStorage.getItem("cookieConsent") === "true";
  });

  useEffect(() => {
    if (consentido) {
      // ⚡ Aqui você ativa seu script externo
      carregarScriptExterno("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX");

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXX"); // <-- substitua com seu ID real
    }
  }, [consentido]);

  const aceitarCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsentido(true);
  };

  const carregarScriptExterno = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  };

  if (consentido) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.texto}>
        Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{" "}
        <a href="/politica-de-privacidade" target="_blank" style={styles.link}>Política de Privacidade</a>.
      </p>
      <button onClick={aceitarCookies} style={styles.botao}>
        Aceitar
      </button>
    </div>
  );
}

export default ConsentManager;

// 🎨 Estilos
const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#111827",
    color: "#fff",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
    flexWrap: "wrap",
    gap: "12px",
  },
  texto: {
    margin: 0,
    fontSize: "14px",
    flex: 1,
  },
  botao: {
    backgroundColor: "#10B981",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  link: {
    color: "#6EE7B7",
    textDecoration: "underline",
  },
};
