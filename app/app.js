const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("../config/database");
require("../models");
const artisanRoutes = require("../routes/artisanRoutes");
const villeRoutes = require("../routes/villeRoutes");
const specialiteRoutes = require("../routes/specialiteRoutes");
const categorieRoutes = require("../routes/categorieRoutes");
const contactRoutes = require("../routes/contactRoutes");

app.use(express.json());
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: frontendUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);
app.use("/api/artisans", artisanRoutes);
app.use("/api/villes", villeRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/contact", contactRoutes);

(async () => {
  try {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function connectWithRetry(retries = 5, delay = 5000) {
      for (let i = 1; i <= retries; i++) {
        try {
          console.log(`Tentative de connexion (${i}/${retries})...`);
          await sequelize.authenticate();
          await sequelize.sync({ force: false });
          console.log("La base de données est connectée");
          return;
        } catch (err) {
          console.error(`Tentative ${i} échouée : ${err.message}`);
          if (i === retries) throw err;
          await wait(delay);
        }
      }
    }

    connectWithRetry()
      .then(() => {
        const PORT = process.env.MYSQLPORT || 5000;
        app.listen(PORT, () => {
          console.log(`Serveur lancé sur le port ${PORT}`);
        });
      })
      .catch((error) => {
        console.error("Échec final de connexion à la base :", error);
      });
  } catch (error) {
    console.error("Erreur de démarrage serveur :", error);
  }
})();
