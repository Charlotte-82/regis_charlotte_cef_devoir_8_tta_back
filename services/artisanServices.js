const Artisan = require("../models/artisanModel");
const Specialite = require("../models/specialiteModel");
const Ville = require("../models/villeModel");
const Categorie = require("../models/categorieModel");
const { QueryTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

Specialite.belongsTo(Categorie, { foreignKey: "Id_categorie" });
Artisan.belongsTo(Specialite, { foreignKey: "Id_specialite" });
Artisan.belongsTo(Ville, { foreignKey: "Id_ville" });

exports.getTousArtisans = async () => {
  return await Artisan.findAll({
    include: [
      {
        model: Specialite,
        attributes: ["specialite_libelle"],
        include: [
          {
            model: Categorie,
            attributes: ["categorie_libelle"],
          },
        ],
      },
      { model: Ville, attributes: ["ville_nom"] },
    ],
  });
};

exports.getArtisanById = async (id) => {
  return await Artisan.findByPk(id, {
    include: [
      { model: Ville, attributes: ["ville_nom"] },
      {
        model: Specialite,
        attributes: ["specialite_libelle"],
        include: [{ model: Categorie, attributes: ["categorie_libelle"] }],
      },
    ],
  });
};

exports.fetchTopArtisans = async () => {
  const sql = `
    SELECT 
      a.Id_artisan AS id,
      a.artisan_image AS image,
      a.artisan_nom AS nom,
      a.artisan_note AS note,
      a.artisan_apropos AS apropos,
      s.specialite_libelle AS specialite,
      v.ville_nom AS ville
    FROM artisan a
    JOIN specialite s ON a.Id_specialite = s.Id_specialite
    JOIN ville v ON a.Id_ville = v.Id_ville
    WHERE a.artisan_top = true
    ORDER BY a.artisan_note DESC
    LIMIT 3
  `;

  try {
    const results = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    return results;
  } catch (error) {
    console.error("Erreur SQL brute :", error);
    return [];
  }
};

exports.getArtisansParCategorie = async (categorieLibelle) => {
  const sql = `
    SELECT
      a.Id_artisan,
      a.artisan_nom,
      a.artisan_apropos,
      a.artisan_note,
      a.artisan_image,
      a.artisan_site,
      s.specialite_libelle,
      c.categorie_libelle,
      v.ville_nom
    FROM artisan a
    JOIN specialite s ON a.Id_specialite = s.Id_specialite
    JOIN categorie c ON s.Id_categorie = c.Id_categorie
    JOIN ville v ON a.Id_ville = v.Id_ville
    WHERE LOWER(c.categorie_libelle) = :categorie
    ORDER BY s.specialite_libelle;
  `;

  const results = await sequelize.query(sql, {
    replacements: { categorie: categorieLibelle.toLowerCase() },
    type: Sequelize.QueryTypes.SELECT,
  });

  return results;
};

exports.getArtisansByFiltres = async (specialite, ville) => {
  return await Artisan.findAll({
    include: [
      {
        model: Specialite,
        where: { specialite_libelle: specialite },
        attributes: ["specialite_libelle"],
      },
      {
        model: Ville,
        where: { ville_nom: ville },
        attributes: ["ville_nom"],
      },
    ],
  });
};
