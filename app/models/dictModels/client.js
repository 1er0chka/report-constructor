const db = require("../../util/db");
const Sequelize = require("sequelize");
const Client = db.define('client_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Клиент ИОР'

        },
        // comment: 'Клиент ИОР',
    }, {
        freezeTableName: true
    }
);
module.exports = Client