const express = require("express");
const router = express.Router();
console.log("Attempting to load artisanController...");

const artisanControllers = require("../controllers/artisanControllers");
console.log("artisanController loaded:", typeof artisanController);
console.log("getTopArtisans type:", typeof artisanController.getTopArtisans);

router.get("/top", artisanControllers.getTopArtisans);
console.log("GET /api/top received");

router.get("/filtres", artisanControllers.getArtisansFiltres);
router.get("/", artisanControllers.getArtisans);
router.get("/:id", artisanControllers.getArtisanById);

module.exports = router;
