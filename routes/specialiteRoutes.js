const express = require("express");
const router = express.Router();
const specialiteControllers = require("../controllers/specialiteControllers");

router.get("/", specialiteControllers.getSpecialites);

router.get(
  "/par-categorie/:categorie",
  specialiteControllers.getSpecialiteByCategorie
);

router.get("/:id", specialiteControllers.getSpecialiteById);

module.exports = router;
