const specialiteService = require("../services/specialiteServices");

exports.getSpecialites = async (req, res) => {
  try {
    const specialites = await specialiteService.getToutesSpecialites();
    res.status(200).json(specialites);
  } catch (err) {
    console.error("Aucune spécialité n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getSpecialiteById = async (req, res) => {
  const { id } = req.params;

  try {
    const specialite = await specialiteService.getSpecialiteById(id);
    res.status(200).json(specialite);
  } catch (err) {
    console.error("Aucune spécialité n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getSpecialiteByCategorie = async (req, res) => {
  try {
    const { categorie } = req.params;
    console.log("Catégorie reçue :", req.params.categorie);

    const specialites = await specialiteService.getSpecialiteByCategorie(
      categorie
    );
    res.status(200).json(specialites);
  } catch (err) {
    console.error("Erreur dans getSpecialiteByCategorie :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
