const Categorie = require("../models/categorieModel");

exports.getToutesCategories = async () => {
  return await Categorie.findAll();
};

exports.getCategorieById = async (id) => {
  return await Categorie.findByPk(id);
};
