const express = require("express");
const router = express.Router();
const artisanControllers = require("../controllers/artisanControllers");

router.get("/top", artisanControllers.getTopArtisans);
console.log("GET /api/top received"); // Reçue !

router.get("/filtres", artisanControllers.getArtisansFiltres);
router.get("/", artisanControllers.getArtisans);
router.get("/:id", artisanControllers.getArtisanById);

module.exports = router;
