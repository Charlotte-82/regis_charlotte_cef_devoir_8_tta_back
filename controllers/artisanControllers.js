console.log("Attempting to load artisanService...");
const artisanService = require("../services/artisanServices");
console.log("artisanService loaded:", typeof artisanService);
console.log("fetchTopArtisans type:", typeof artisanService.fetchTopArtisans);

exports.getArtisans = async (req, res) => {
  try {
    const { categorie } = req.query;

    let artisans;

    if (categorie) {
      artisans = await artisanService.getArtisansParCategorie(categorie);
    } else {
      artisans = await artisanService.getTousArtisans();
    }

    res.status(200).json(artisans);
  } catch (err) {
    console.error("Erreur lors de la récupération des artisans :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;
    const artisan = await artisanService.getArtisanById(id);
    if (artisan) {
      res.status(200).json(artisan);
    } else {
      res.status(404).json({ message: "Artisan non trouvé" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'artisan :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getTopArtisans = async (req, res) => {
  try {
    console.log("Essai pour obtenir le top des artisans...");
    const topArtisans = await artisanService.fetchTopArtisans();
    console.log("Résultat reçu dans le contrôleur :", topArtisans);
    res.json({ topArtisans });
  } catch (error) {
    console.error("Erreur dans getTopArtisans :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getArtisansFiltres = async (req, res) => {
  try {
    const { specialite, ville } = req.query;
    const artisans = await artisanService.getArtisansByFiltres(
      specialite,
      ville
    );
    res.status(200).json(artisans);
  } catch (err) {
    console.error("Erreur lors de la récupération des artisans filtrés :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
