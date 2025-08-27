const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // precisa ser true na porta 465
  auth: {
    user: "lilith.pocarli@gmail.com",
    pass: "vmgalbmbtxqaoydz", // senha de app
  },
});

transport.sendMail({
  from: 'Lya <lilith.pocarli@gmail.com>',
  to: "wpocarli@gmail.com",
  subject: "Enviando email com nodemailer",
  html: "<h1>Olá</h1><p>Esse email foi enviado com sucesso</p>",
  text: "Enviando email",
})
.then(info => {
  console.log("Email enviado com sucesso:", info.messageId);
})
.catch(err => {
  console.error("Erro ao enviar email:", err);
});
