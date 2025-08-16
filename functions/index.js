const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

// Configuração do Nodemailer (igual seu setup)
const remetente = "suporte.inovahgrowth@gmail.com";
const senhaApp = "uvpv gkxi aolq wksh";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: remetente,
    pass: senhaApp
  }
});

exports.apiNovoCliente = onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método não permitido");
  const { nome, email, plano } = req.body;
  if (!email) return res.status(400).send("E-mail obrigatório");

  const emailNorm = email.trim().toLowerCase();
  const senhaProvisoria = Math.random().toString(36).slice(-8) + "@AI";

  try {
    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email: emailNorm,
        password: senhaProvisoria,
        displayName: nome || ""
      });
    } catch (error) {
      if (error.code === "auth/email-already-exists") {
        userRecord = await admin.auth().getUserByEmail(emailNorm);
      } else {
        throw error;
      }
    }

    // Só registro histórico (sem status)
    await admin.firestore().collection("clientes").doc(emailNorm).set({
      nome: nome || "",
      email: emailNorm,
      criadoVia: "hotmart-make",
      dataCriacao: new Date().toISOString()
    }, { merge: true });

    const mailOptions = {
      from: `"Inovah Growth" <${remetente}>`,
      to: emailNorm,
      subject: "Bem-vindo(a) à Inovah Growth!",
      html: `
        <h2>Olá${nome ? ' ' + nome : ''}, seja bem-vindo(a)!</h2>
        <p>Seu acesso está liberado. Use os dados abaixo para entrar:</p>
        <b>Painel:</b> <a href="https://inovah-sm-ia.firebaseapp.com/">https://inovah-sm-ia.firebaseapp.com/</a><br>
        <b>E-mail:</b> ${emailNorm}<br>
        <b>Senha provisória:</b> ${senhaProvisoria}<br>
        <br>
        <small>Recomendamos trocar a senha ao entrar pela primeira vez.<br>
        Qualquer dúvida, fale com o nosso suporte.<br>
        Inovah Growth.</small>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      ok: true,
      email: emailNorm,
      senhaProvisoria,
      msg: "Cliente criado/atualizado com sucesso no Auth e Firestore! E-mail enviado."
    });

  } catch (err) {
    console.error("Erro ao criar cliente:", err);
    res.status(500).send("Erro interno do servidor");
  }
});

// Pode apagar apiVerificaEmail e apiRemoverCliente se não for mais usar!

