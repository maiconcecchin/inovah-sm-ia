import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  // Novos estados para exibir senha e lembrar senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarSenha, setLembrarSenha] = useState(false);

  // No primeiro carregamento, busca senha salva (se existir)
  useEffect(() => {
    const savedEmail = localStorage.getItem("loginEmail") || "";
    const savedSenha = localStorage.getItem("loginSenha") || "";
    const remember = localStorage.getItem("lembrarSenha") === "true";
    if (remember && savedEmail && savedSenha) {
      setEmail(savedEmail);
      setSenha(savedSenha);
      setLembrarSenha(true);
    }
  }, []);

  // Normaliza o e-mail
  function normalizarEmail(email) {
    return email.trim().toLowerCase();
  }

  const loginEmailSenha = async (e) => {
    e.preventDefault();
    setErro("");
    setResetMsg("");
    setLoading(true);
    try {
      const emailNorm = normalizarEmail(email);
      await signInWithEmailAndPassword(auth, emailNorm, senha);
      // Se marcar para lembrar, salva no localStorage
      if (lembrarSenha) {
        localStorage.setItem("loginEmail", emailNorm);
        localStorage.setItem("loginSenha", senha);
        localStorage.setItem("lembrarSenha", "true");
      } else {
        localStorage.removeItem("loginEmail");
        localStorage.removeItem("loginSenha");
        localStorage.removeItem("lembrarSenha");
      }
      // App.js detecta login automaticamente
    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    }
    setLoading(false);
  };

  const esqueceuSenha = async () => {
    setErro("");
    setResetMsg("");
    if (!email) {
      setErro("Digite seu e-mail para redefinir a senha.");
      return;
    }
    setLoading(true);
    try {
      const emailNorm = normalizarEmail(email);
      await sendPasswordResetEmail(auth, emailNorm);
      setResetMsg("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (err) {
      setErro("Erro ao enviar e-mail de redefinição. Verifique o e-mail digitado.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={loginEmailSenha}>
        <img src="/logo-inovah-login.png" alt="Logo Inovah Growth" style={styles.logo} />
        <h2 style={styles.title}>Bem-vindo(a) à <b>Inovah Growth</b></h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="E-mail"
          style={styles.input}
          autoComplete="username"
          required
        />

        <div style={{ position: "relative", marginBottom: "12px" }}>
          <input
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
            style={{ ...styles.input, marginBottom: 0, paddingRight: "10px" }}
            autoComplete="current-password"
            required
          />
          {/* Botão de visualizar senha */}
          <button
            type="button"
            style={styles.verSenhaBtn}
            onClick={() => setMostrarSenha((v) => !v)}
            tabIndex={-1}
            aria-label={mostrarSenha ? "Ocultar senha" : "Exibir senha"}
          >
            {mostrarSenha ? (
              // Olho "fechado"
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a17.934 17.934 0 014.253-5.952M6.872 6.872A10.03 10.03 0 0112 5c7 0 10 7 10 7a17.978 17.978 0 01-3.443 4.86M3 3l18 18" />
              </svg>
            ) : (
              // Olho "aberto"
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#fff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0s-3 7-9 7-9-7-9-7 3-7 9-7 9 7 9 7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Checkbox para lembrar senha */}
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={lembrarSenha}
            onChange={e => setLembrarSenha(e.target.checked)}
            style={styles.checkbox}
          />
          Lembrar minha senha neste dispositivo
        </label>

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Aguarde..." : "Entrar"}
        </button>

        <button
          type="button"
          style={{ ...styles.button, background: "#333", marginTop: 8, color: "#ccc" }}
          onClick={esqueceuSenha}
          disabled={loading}
        >
          Esqueci minha senha
        </button>

        {/* Mensagem de erro ou sucesso */}
        {erro && (
          <p style={{ color: "#f87171", marginTop: 16, textAlign: "center" }}>
            {erro}
          </p>
        )}
        {resetMsg && (
          <p style={{ color: "#38bdf8", marginTop: 16, textAlign: "center" }}>
            {resetMsg}
          </p>
        )}

        <p style={{ color: "#888", fontSize: 12, marginTop: 24, textAlign: "center" }}>
          Utilize o mesmo e-mail da compra na Hotmart.
        </p>
      </form>
    </div>
  );
}

export default Login;

// Estilos
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  form: {
    backgroundColor: "#1f1f1f",
    padding: "60px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
  },
  logo: {
    width: "160px",
    margin: "0 auto 24px",
    display: "block",
  },
  title: {
    color: "#fff",
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    marginBottom: "12px",
    background: "#232323",
    color: "#fff",
    fontSize: "15px",
    outline: "none"
  },
  button: {
    background: "#a855f7",
    color: "#fff",
    padding: "14px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px",
  },
  verSenhaBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    outline: "none",
    zIndex: 2,
    color: "#fff"
  },
  checkboxLabel: {
    color: "#ccc",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    marginBottom: "4px",
    gap: "8px"
  },
  checkbox: {
    marginRight: "6px",
    accentColor: "#a855f7",
    width: "17px",
    height: "17px",
    cursor: "pointer",
  },
};
