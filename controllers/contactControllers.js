const contactService = require("../services/contactServices");

exports.envoyerContact = async (req, res) => {
  const { nom, email, objet, message, destinataire } = req.body;

  try {
    await contactService.envoyerEmail({
      nom,
      email,
      objet,
      message,
      destinataire,
    });

    res.status(200).json({ message: "Email envoyé" });
  } catch (err) {
    console.error("Erreur d'envoi :", err);
    res.status(500).json({ error: "Échec de l'envoi" });
  }
};
