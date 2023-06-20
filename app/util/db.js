const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
module.exports = sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    schema: dbConfig.schema
});
sequelize.getQueryInterface().showAllTables({ schema: 'models' })
    .then(tables => {
        console.log(tables);
    });