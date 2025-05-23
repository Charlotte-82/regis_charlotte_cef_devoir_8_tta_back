const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artisan = sequelize.define(
  "artisan",
  {
    id_artisan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artisan_nom: { type: DataTypes.STRING, allowNull: false },
    artisan_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    artisan_site: { type: DataTypes.STRING },
    artisan_apropos: { type: DataTypes.TEXT },
    artisan_note: {
      type: DataTypes.DECIMAL(3, 1),
      validate: { min: 0.0, max: 5.0 },
    },
    artisan_top: { type: DataTypes.BOOLEAN, defaultValue: false },
    artisan_image: { type: DataTypes.STRING },
    Id_specialite: {
      type: DataTypes.INTEGER,
      references: {
        model: "specialite",
        key: "Id_specialite",
      },
    },
    Id_ville: {
      type: DataTypes.INTEGER,
      references: {
        model: "ville",
        key: "Id_ville",
      },
    },
  },
  {
    timestamps: true,
    tableName: "artisan",
  }
);

module.exports = Artisan;
