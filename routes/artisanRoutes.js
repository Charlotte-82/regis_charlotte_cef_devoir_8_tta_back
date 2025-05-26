const express = require("express");
const router = express.Router();
console.log("Attempting to load artisanController from artisanRoutes.js...");

const artisanControllers = require("../controllers/artisanControllers");
console.log("artisanController loaded:", typeof artisanController);
console.log("getTopArtisans type:", typeof artisanController.getTopArtisans);

router.get("/top", artisanControllers.getTopArtisans);
router.get("/filtres", artisanControllers.getArtisansFiltres);
router.get("/", artisanControllers.getArtisans);
router.get("/:id", artisanControllers.getArtisanById);

module.exports = router;
