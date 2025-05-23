const categorieService = require("../services/categorieServices");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categorieService.getToutesCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Aucune catégorie n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await categorieService.getCategorieById();
    res.status(200).json(categorie);
  } catch (err) {
    console.error("Aucune catégorie n'a été trouvée :", err);
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
};
