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
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("CORS denied for origin:", origin);
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

app.use("/api/artisans", artisanRoutes);
app.use("/api/villes", villeRoutes);
app.use("/api/specialites", specialiteRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/contact", contactRoutes);

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
