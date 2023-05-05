const { Sequelize } = require("sequelize");
const config = require("../config/config.js");
const { setupModels } = require("../db/models/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// export const sequelize = new Sequelize(URI, {
//   dialect: "mysql"
// });

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
});

// después de inicializar sequelize, o sea
// esta dos llamadas después de new Sequelize()
setupModels(sequelize);

module.exports = {
  sequelize
};





