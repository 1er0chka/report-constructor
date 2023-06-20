const db = require("../../util/db");
const Sequelize = require("sequelize");
const Currency = db.define('currency_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            comment: 'Валюта ',
        },
        value: {
            type: Sequelize.FLOAT,
            comment: 'Значение',
            validate: {
                isFloat: true
            }
        }

    }, {
        freezeTableName: true
    }
);
module.exports = Currency