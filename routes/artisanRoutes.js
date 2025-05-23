const express = require("express");
const router = express.Router();
const artisanControllers = require("../controllers/artisanControllers");

router.get("/top", artisanControllers.getTopArtisans);
router.get("/filtres", artisanControllers.getArtisansFiltres); // ✅ remonte cette ligne
router.get("/", artisanControllers.getArtisans);
router.get("/:id", artisanControllers.getArtisanById); // ❗ toujours à la fin

module.exports = router;
