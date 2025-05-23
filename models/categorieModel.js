const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categorie = sequelize.define(
  "categorie",
  {
    Id_categorie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categorie_libelle: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
    tableName: "categorie",
  }
);

module.exports = Categorie;
