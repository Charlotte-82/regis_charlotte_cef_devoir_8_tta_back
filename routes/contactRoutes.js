const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactControllers");

router.post("/api/contact", contactController.envoyerContact);

module.exports = router;
