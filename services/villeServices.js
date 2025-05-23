const Artisan = require("../models/artisanModel");
const Specialite = require("../models/specialiteModel");
const Ville = require("../models/villeModel");

exports.getToutesVilles = async () => {
  return await Ville.findAll();
};

exports.getVilleById = async (id) => {
  return await Ville.findByPk(id);
};

exports.getVillesBySpecialite = async (specialiteLibelle) => {
  console.log("Recherche des villes pour la spécialité :", specialiteLibelle);

  return await Ville.findAll({
    include: [
      {
        model: Artisan,
        required: true,
        include: [
          {
            model: Specialite,
            where: {
              specialite_libelle: specialiteLibelle,
            },
          },
        ],
      },
    ],
    attributes: ["Id_ville", "ville_nom"],
  });
};
