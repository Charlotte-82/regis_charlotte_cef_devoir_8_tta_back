const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Specialite = sequelize.define(
  "specialite",
  {
    Id_specialite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specialite_libelle: { type: DataTypes.STRING, allowNull: false },
    Id_categorie: {
      type: DataTypes.INTEGER,
      references: {
        model: "categorie",
        key: "Id_categorie",
      },
    },
  },
  {
    timestamps: true,
    tableName: "specialite",
  }
);

module.exports = Specialite;
