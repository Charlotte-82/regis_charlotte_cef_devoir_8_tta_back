const villeService = require("../services/villeServices");

exports.getVilles = async (req, res) => {
  try {
    const villes = await artisanService.getToutesVilles();
    res.status(200).json(villes);
  } catch (err) {
    console.error("Aucune ville n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getVilleById = async (req, res) => {
  try {
    const ville = await villeService.getVilleById();
    res.status(200).json(ville);
  } catch (err) {
    console.error("Aucune ville n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getVillesBySpecialite = async (req, res) => {
  try {
    const specialite = req.params.specialite;
    console.log("Specialité demandée :", req.params.specialite);

    const villes = await villeService.getVillesBySpecialite(specialite);
    res.status(200).json(villes);
  } catch (err) {
    console.error("Erreur récupération villes :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
