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

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:3000"];
console.log("Configuring CORS for origins:", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        console.warn("CORS denied for origin:", origin, msg);
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

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

// (async () => {
//   try {
//     const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//     async function connectWithRetry(retries = 5, delay = 5000) {
//       for (let i = 1; i <= retries; i++) {
//         try {
//           console.log(`Tentative de connexion (${i}/${retries})...`);
//           await sequelize.authenticate();
//           await sequelize.sync({ force: false });
//           console.log("La base de données est connectée");
//           return;
//         } catch (err) {
//           console.error(`Tentative ${i} échouée : ${err.message}`);
//           if (i === retries) throw err;
//           await wait(delay);
//         }
//       }
//     }

//     connectWithRetry()
//       .then(() => {
//         const PORT = process.env.MYSQLPORT || 5000;
//         app.listen(PORT, () => {
//           console.log(`Serveur lancé sur le port ${PORT}`);
//         });
//       })
//       .catch((error) => {
//         console.error("Échec final de connexion à la base :", error);
//       });
//   } catch (error) {
//     console.error("Erreur de démarrage serveur :", error);
//   }
// })();

app.get("/", (req, res) => {
  console.log("GET / received");
  res.status(200).send("Backend is running!");
});

const PORT = process.env.MYSQLPORT || 3001;
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Backend server listening on port ${PORT}`);
      console.log("FRONTEND_URL for CORS:", process.env.FRONTEND_URL);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app / app.js;
