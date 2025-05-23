const express = require("express");
const router = express.Router();
const specialiteControllers = require("../controllers/specialiteControllers");

// Récupérer toutes les spécialités
router.get("/", specialiteControllers.getSpecialites);

// Récupérer les spécialités selon la catégorie (via query string)
router.get(
  "/par-categorie/:categorie",
  specialiteControllers.getSpecialiteByCategorie
);

// Récupérer une spécialité par son ID
router.get("/:id", specialiteControllers.getSpecialiteById);

module.exports = router;
