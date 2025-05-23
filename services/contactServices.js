const nodemailer = require("nodemailer");

exports.envoyerEmail = async ({ nom, email, objet, message, destinataire }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: destinataire,
    subject: objet || "Demande de contact via Trouve Ton Artisan",
    html: `
      <h3>Nouvelle demande de contact</h3>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Message :</strong><br/>${message}</p>
    `,
  });
};
