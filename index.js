const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lilith.pocarli@gmail.com",
    pass: "vmgalbmbtxqaoydz",
  },
});

app.post("/enviar-codigo", async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const info = await transport.sendMail({
      from: 'Lya <lilith.pocarli@gmail.com>',
      to: email,
      subject: "Código de verificação",
      html: `<p>Seu código de verificação é: <b>${codigo}</b></p>`,
      text: `Seu código de verificação é: ${codigo}`,
    });

    res.json({ status: "ok", messageId: info.messageId });
  } catch (err) {
    res.json({ status: "erro", mensagem: err.message });
  }
});

app.listen(3001, () => {
  console.log("Servidor de email rodando na porta 3001");
});
