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
        Usamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa{" "}
        <a href="/politica-de-privacidade" target="_blank" style={styles.link}>
          Política de Privacidade
        </a>.
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
    bottom: 20,                     // dá um respiro da borda inferior
    left: "50%",                    // referencia no centro
    transform: "translateX(-50%)",  // centraliza horizontalmente
    width: "90%",                   // responsivo em telas pequenas
    maxWidth: "700px",              // limite no desktop
    backgroundColor: "#111827",
    color: "#fff",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
    gap: "12px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
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
    whiteSpace: "nowrap",
  },
  link: {
    color: "#6EE7B7",
    textDecoration: "underline",
  },
};
