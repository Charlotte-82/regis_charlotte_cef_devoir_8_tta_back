const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ville = sequelize.define(
  "ville",
  {
    Id_ville: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ville_nom: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
    tableName: "ville",
  }
);

module.exports = Ville;
