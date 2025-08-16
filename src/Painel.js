import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import useIsDesktop from "./useIsDesktop";

function Painel({ user }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mostrarTutorial, setMostrarTutorial] = useState(false);
  const isDesktop = useIsDesktop(900); // Usei o seu breakpoint 900

  useEffect(() => {
    const jaViuTutorial = localStorage.getItem("tutorialVisto");
    setMostrarTutorial(!jaViuTutorial);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const agentes = [
    {
      nome: "InovahProposta",
      descricao: "Propostas comerciais prontas pra enviar",
      link: "https://chatgpt.com/g/g-687bdad200808191be343e2a2bd090d9-inovahproposta",
      icon: "💰",
      gradient: "linear-gradient(135deg, #047857 0%, #16A34A 100%)",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(4, 120, 87, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahBrief",
      descricao: "Briefing claro e rápido com cliente",
      link: "https://chatgpt.com/g/g-687a878b798c81919dd2f4058260cae8-inovahbrief",
      icon: "📋",
      gradient: "linear-gradient(135deg, #1E40AF 0%, #0891B2 100%)",
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(30, 64, 175, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(8, 145, 178, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahPersona",
      descricao: "Criação de personas estratégicas",
      link: "https://chatgpt.com/g/g-68795f849b94819189c2114faf39faac-inovapersona",
      icon: "🎭",
      gradient: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
      bgPattern: "radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(219, 39, 119, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahRadar",
      descricao: "Tendências e datas quentes do nicho",
      link: "https://chatgpt.com/g/g-687ab7ac10948191837d5bfb9da183dd-inovahradar",
      icon: "📡",
      gradient: "linear-gradient(135deg, #DC2626 0%, #EA580C 100%)",
      bgPattern: "radial-gradient(circle at 40% 60%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(234, 88, 12, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahPauta",
      descricao: "Pauta editorial por objetivo",
      link: "https://chatgpt.com/g/g-687a96bf0eb0819185e99a0de0cc795c-inovahpauta",
      icon: "📝",
      gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
      bgPattern: "radial-gradient(circle at 25% 75%, rgba(5, 150, 105, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(13, 148, 136, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahCopy",
      descricao: "Legendas com gancho, emoção e CTA",
      link: "https://chatgpt.com/g/g-687a9e841940819190085aaedc83b5bc-inovahcopy",
      icon: "✍️",
      gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
      bgPattern: "radial-gradient(circle at 35% 65%, rgba(217, 119, 6, 0.3) 0%, transparent 50%), radial-gradient(circle at 65% 35%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahReels",
      descricao: "Roteiros de vídeos criativos e estratégicos",
      link: "https://chatgpt.com/g/g-687d6040bd88819183ff6d92068522ba-inovareels",
      icon: "🎥",
      gradient: "linear-gradient(135deg, #5B21B6 0%, #7C2D12 100%)",
      bgPattern: "radial-gradient(circle at 45% 55%, rgba(91, 33, 182, 0.3) 0%, transparent 50%), radial-gradient(circle at 55% 45%, rgba(124, 45, 18, 0.3) 0%, transparent 50%)"
    },
    {
      nome: "InovahRelatório",
      descricao: "Análise de métricas com ação concreta",
      link: "https://chatgpt.com/g/g-687ba652b43c8191b5fb6e9b47307d25-inovahrelatorio",
      icon: "📈",
      gradient: "linear-gradient(135deg, #BE185D 0%, #9333EA 100%)",
      bgPattern: "radial-gradient(circle at 30% 70%, rgba(190, 24, 93, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)"
    },
  ];

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/seuusuario", icon: "icon-instagram.png" },
    { name: "Facebook", url: "https://facebook.com/seupagina", icon: "icon-facebook.png" }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1F2937 0%, #000000 50%, #1F2937 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* POPUP TUTORIAL AJUSTADA */}
      {mostrarTutorial && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999,
          background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#18122B",
            padding: isDesktop ? 40 : 12,
            borderRadius: 18,
            maxWidth: 820,
            width: "95%",
            boxShadow: "0 12px 36px #0008",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
          }}>
            <h2 style={{
              fontSize: isDesktop ? 32 : 18,
              color: "#bf38ad",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
              flex: "none"
            }}>
              Como funciona na prática
            </h2>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                marginBottom: 18,
                display: "grid",
                gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
                gap: 14,
              }}
            >
              <StepCard
                icon="/icone-assistente.png"
                titulo="1. Escolha o assistente certo para sua tarefa"
                texto="Vai criar pauta? Roteiro de Reels? Analisar métricas? Cada assistente foi feito pra resolver uma dor específica da rotina Social Media."
              />
              <StepCard
                icon="/icone-papel.png"
                titulo="2. Diga o que você precisa"
                texto='"Preciso de uma legenda pra um post de venda de mentoria" ou "Cria uma pauta com foco em engajamento sobre autoestima".'
              />
              <StepCard
                icon="/icone-ia.png"
                titulo="3. A IA entende o contexto e executa com estratégia"
                texto="Nossos assistentes foram treinados com base em problemas reais. Eles interpretam seu pedido e respondem com clareza, lógica e foco no objetivo."
              />
              <StepCard
                icon="/icone-pronto.png"
                titulo="4. Receba a solução pronta pra usar"
                texto="Em minutos você tem o conteúdo certo, pronto pra aplicar, personalizar e entregar profissionalismo, mesmo no dia mais corrido."
              />
            </div>
            <button
              onClick={() => {
                localStorage.setItem("tutorialVisto", "true");
                setMostrarTutorial(false);
              }}
              style={{
                background: "#bf38ad",
                color: "#fff",
                border: "none",
                padding: isDesktop ? "10px 24px" : "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
                marginTop: 4,
                alignSelf: "center",
                flex: "none"
              }}>
              Ok, entendi!
            </button>
          </div>
        </div>
      )}

      {/* Botão de reabrir tutorial */}
      {!mostrarTutorial && (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <button
            onClick={() => {
              localStorage.removeItem("tutorialVisto");
              setMostrarTutorial(true);
            }}
            style={{
              background: "#bf38ad", color: "#fff", border: "none", padding: "7px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "14px"
            }}>
            Ver tutorial novamente
          </button>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 10, padding: isDesktop ? "32px 20px" : "10px 5px" }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isDesktop ? "32px" : "18px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: isDesktop ? "24px" : "12px 6px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          flexDirection: isDesktop ? "row" : "column",
          gap: isDesktop ? "20px" : "10px",
          textAlign: isDesktop ? "left" : "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isDesktop ? "16px" : "10px",
            flexDirection: isDesktop ? "row" : "column"
          }}>
            <div style={{
              width: isDesktop ? "96px" : "54px",
              height: isDesktop ? "96px" : "54px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}>
              <img src="logo-inovah.png" alt="Inovah Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <h1 style={{ fontSize: isDesktop ? "24px" : "16px", fontWeight: "bold", color: "white", margin: 0 }}>INOVAH GROWTH</h1>
              <p style={{ color: "#9CA3AF", fontSize: isDesktop ? "14px" : "11px", margin: 0 }}>Você sempre um passo a frente.</p>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isDesktop ? "24px" : "10px",
            flexDirection: isDesktop ? "row" : "column"
          }}>
            <div style={{ textAlign: isDesktop ? "right" : "center" }}>
              <p style={{ color: "white", fontWeight: "500", margin: 0, fontSize: isDesktop ? "16px" : "12px" }}>
                Bem-vindo, {user?.displayName || user?.email}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: isDesktop ? "14px" : "11px", margin: 0 }}>
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: isDesktop ? "40px" : "32px",
                    height: isDesktop ? "40px" : "32px",
                    background: "rgba(139, 92, 246, 0.2)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    transition: "all 0.3s ease",
                    padding: isDesktop ? "8px" : "4px"
                  }}
                  title={social.name}
                  onMouseEnter={e => { e.target.style.background = "rgba(139, 92, 246, 0.4)"; e.target.style.transform = "scale(1.1)"; }}
                  onMouseLeave={e => { e.target.style.background = "rgba(139, 92, 246, 0.2)"; e.target.style.transform = "scale(1)"; }}
                >
                  <img src={`/${social.icon}`} alt={social.name} style={{ width: isDesktop ? "24px" : "16px", height: isDesktop ? "24px" : "16px", objectFit: "contain" }} />
                </a>
              ))}
            </div>
          </div>
        </header>

        <section style={{
          maxWidth: isDesktop ? "1200px" : "100%",
          margin: "0 auto 38px"
        }}>
          <h2 style={{
            fontSize: isDesktop ? "40px" : "23px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: isDesktop ? "16px" : "10px"
          }}>Agentes de IA para Social Media</h2>
          <p style={{
            color: "#9CA3AF",
            textAlign: "center",
            maxWidth: "100%",
            margin: "0 auto 18px",
            lineHeight: "1.5",
            fontSize: isDesktop ? "20px" : "14px",
            marginBottom: isDesktop ? "28px" : "18px"
          }}>
            Seu novo time de especialistas!
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "1fr",
            gap: isDesktop ? "24px" : "10px",
            padding: isDesktop ? "0 20px" : "0"
          }}>
            {agentes.map((agente, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  background: `${agente.bgPattern}, rgba(0, 0, 0, 0.6)`,
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: isDesktop ? "20px" : "14px 7px",
                  border: hoveredCard === index ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  transform: hoveredCard === index ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: hoveredCard === index
                    ? `0 20px 40px rgba(139, 92, 246, 0.25), 0 0 30px ${agente.gradient.match(/#[0-9A-F]{6}/gi)?.[0]}40`
                    : "0 8px 32px rgba(0, 0, 0, 0.4)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "8px" }}>
                  <div style={{
                    width: isDesktop ? "48px" : "36px",
                    height: isDesktop ? "48px" : "36px",
                    background: agente.gradient,
                    borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isDesktop ? "20px" : "17px", marginBottom: "7px", boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    {agente.icon}
                  </div>
                  <h3 style={{ fontSize: isDesktop ? "18px" : "15px", fontWeight: "600", color: "white", margin: 0 }}>{agente.nome}</h3>
                </div>
                <p style={{
                  color: "#D1D5DB", fontSize: isDesktop ? "13px" : "11px", lineHeight: "1.4", marginBottom: "12px"
                }}>{agente.descricao}</p>
                <a
                  href={agente.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isDesktop ? "10px 20px" : "7px 10px",
                    background: agente.gradient,
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    transform: hoveredCard === index ? "scale(1.05)" : "scale(1)",
                    boxShadow: hoveredCard === index
                      ? "0 8px 25px rgba(139,92,246,0.3)" : "0 4px 15px rgba(0,0,0,0.2)",
                    fontSize: isDesktop ? "14px" : "12px"
                  }}
                >
                  <span>Acessar agente</span>
                  <svg style={{ width: "14px", height: "14px", marginLeft: "6px", fill: "none", stroke: "currentColor", strokeWidth: "2" }} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        <div style={{
          textAlign: "center",
          color: "#9CA3AF",
          fontSize: isDesktop ? "18px" : "14px",
          fontWeight: "500",
          marginBottom: isDesktop ? "22px" : "16px"
        }}>
          24 horas por dia, 7 dias por semana
        </div>

        <footer style={{ textAlign: "center" }}>
          <button
            onClick={() => signOut(auth)}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: isDesktop ? "16px 32px" : "10px 18px",
              background: "linear-gradient(135deg, #EF4444 0%, #EC4899 100%)",
              color: "white", fontWeight: "500", borderRadius: "12px", border: "none",
              cursor: "pointer", transition: "all 0.3s ease", fontSize: isDesktop ? "16px" : "13px", textAlign: "center"
            }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 8px 25px rgba(239, 68, 68, 0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)"; }}
          >
            <svg style={{
              width: isDesktop ? "20px" : "14px", height: isDesktop ? "20px" : "14px", marginRight: isDesktop ? "8px" : "4px", fill: "none", stroke: "currentColor", strokeWidth: "2"
            }} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
            </svg>
            Sair da plataforma
          </button>
        </footer>
      </div>
    </div>
  );
}

// Card do passo a passo
function StepCard({ icon, titulo, texto }) {
  return (
    <div style={{
      background: "#25194a",
      borderRadius: 14,
      padding: 14,
      color: "#fff",
      minHeight: 90,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <img src={icon} alt="" style={{ width: 22, height: 22, marginRight: 10 }} />
        <span style={{ fontWeight: 700, fontSize: 13 }}>{titulo}</span>
      </div>
      <span style={{ color: "#e0e0e0", fontSize: 12 }}>{texto}</span>
    </div>
  );
}

export default Painel;
