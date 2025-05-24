const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_HOST:", process.env.MYSQLHOST);
console.log("DB_PORT:", process.env.MYSQLPORT);
console.log("DB_USER:", process.env.MYSQLUSER);
console.log("DB_NAME:", process.env.MYSQLDATABASE);

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
