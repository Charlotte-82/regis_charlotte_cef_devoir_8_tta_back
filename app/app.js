// const express = require("express");
// const cors = require("cors");
// const app = express();
// const sequelize = require("../config/database");
// require("../models");
// const artisanRoutes = require("../routes/artisanRoutes");
// const villeRoutes = require("../routes/villeRoutes");
// const specialiteRoutes = require("../routes/specialiteRoutes");
// const categorieRoutes = require("../routes/categorieRoutes");
// const contactRoutes = require("../routes/contactRoutes");

// const allowedOrigins = process.env.FRONTEND_URL
//   ? process.env.FRONTEND_URL.split(",")
//   : ["http://localhost:3000"];
// console.log("Configuring CORS for origins:", allowedOrigins);
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         console.warn("CORS denied for origin:", origin, msg);
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// app.use(express.json());
// const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

// app.use(
//   cors({
//     origin: frontendUrl,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     optionsSuccessStatus: 204,
//   })
// );
// app.use("/api/artisans", artisanRoutes);
// app.use("/api/villes", villeRoutes);
// app.use("/api/specialites", specialiteRoutes);
// app.use("/api/categories", categorieRoutes);
// app.use("/api/contact", contactRoutes);

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

// app.get("/", (req, res) => {
//   console.log("GET / received");
//   res.status(200).send("Backend is running!");
// });

// const PORT = process.env.MYSQLPORT || 3001;
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced");
//     app.listen(PORT, () => {
//       console.log(`Backend server listening on port ${PORT}`);
//       console.log("FRONTEND_URL for CORS:", process.env.FRONTEND_URL);
//     });
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// app/app.js

const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("../config/database");
require("../models"); // Assure-toi que cela charge bien tous tes modèles Sequelize
const artisanRoutes = require("../routes/artisanRoutes");
const villeRoutes = require("../routes/villeRoutes");
const specialiteRoutes = require("../routes/specialiteRoutes");
const categorieRoutes = require("../routes/categorieRoutes");
const contactRoutes = require("../routes/contactRoutes");

// --- 1. Configuration CORS (UNE SEULE FOIS ET CORRECTEMENT) ---
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:3000"];

console.log("Configuring CORS for allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Permet les requêtes sans Origin (ex: Postman, curl)
      if (!origin) return callback(null, true);
      // Vérifie si l'origine de la requête est dans la liste des origines autorisées
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg = `The CORS policy for this site does not allow access from origin ${origin}.`;
        console.warn("CORS denied:", msg);
        return callback(new Error(msg), false);
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204, // Pour les requêtes OPTIONS (preflight)
  })
);

app.use(express.json()); // Middleware pour parser le JSON
app.get("/api/artisans/top", (req, res) => {
  console.log(
    "APP.JS: Requête /api/artisans/top interceptée DIRECTEMENT dans app.js !"
  );
  // Envoie une réponse bidon pour tester
  res.header(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  res
    .status(200)
    .json({ message: "Requête interceptée par app.js !", test: true });
});
// --- 2. Définition des Routes API ---
app.use("/api/artisans", artisanRoutes);
app.use("/api/villes", villeRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/contact", contactRoutes);

// --- 3. Route de base pour vérifier que le backend tourne ---
app.get("/", (req, res) => {
  console.log("GET / received. Backend is running!");
  res.status(200).send("Backend is running!");
});

// --- 4. Connexion à la BDD et Lancement du Serveur (UNE SEULE FOIS) ---

// Utilise process.env.PORT fourni par Railway, ou 3001 pour le développement local
const SERVER_PORT = process.env.PORT || 3001; // <<< C'EST LE PORT DE TON SERVEUR EXPRESS

async function startServer() {
  try {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 secondes

    for (let i = 1; i <= MAX_RETRIES; i++) {
      try {
        console.log(
          `Attempting to connect to database (${i}/${MAX_RETRIES})...`
        );
        await sequelize.authenticate(); // Teste la connexion à la BDD
        await sequelize.sync({ force: false }); // Synchronise les modèles sans supprimer les tables
        console.log("Database connected and synced.");
        break; // Connexion réussie, sort de la boucle
      } catch (err) {
        console.error(
          `Database connection attempt ${i} failed: ${err.message}`
        );
        if (i === MAX_RETRIES) {
          console.error(
            "Final database connection attempt failed. Exiting.",
            err
          );
          process.exit(1); // Arrête le processus Node si la connexion échoue définitivement
        }
        await wait(RETRY_DELAY);
      }
    }

    // Lance le serveur Express UNIQUEMENT APRÈS une connexion réussie à la BDD
    app.listen(SERVER_PORT, () => {
      console.log(
        `Backend server successfully launched and listening on port ${SERVER_PORT}`
      );
      console.log(
        "FRONTEND_URL for CORS (from env):",
        process.env.FRONTEND_URL
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Arrête le processus en cas d'erreur fatale
  }
}

startServer();
