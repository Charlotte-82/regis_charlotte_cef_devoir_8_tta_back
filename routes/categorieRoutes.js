const express = require("express");
const router = express.Router();
const categorieControllers = require("../controllers/categorieControllers");

router.get("/", categorieControllers.getCategories);
router.get("/:id", categorieControllers.getCategorieById);

module.exports = router;
