const Categorie = require("../models/categorieModel");
const Specialite = require("../models/specialiteModel");

exports.getToutesSpecialites = async () => {
  return await Specialite.findAll();
};

exports.getSpecialiteById = async (id) => {
  return await Specialite.findByPk(id);
};

exports.getSpecialiteByCategorie = async (categorieLibelle) => {
  console.log("Filtrage des spécialités pour la catégorie :", categorieLibelle);

  return await Specialite.findAll({
    include: [
      {
        model: Categorie,
        where: {
          categorie_libelle: categorieLibelle,
        },
        attributes: [], // on ne veut pas renvoyer la catégorie entière
      },
    ],
    attributes: ["Id_specialite", "specialite_libelle"],
  });
};
