const db = require("../../util/db");
const Sequelize = require("sequelize");
const FunctionalBlock = db.define('functionalBlock_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Функциональный блок'
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,
        },
        // comment: 'Функциональный блок',
    }, {
        freezeTableName: true
    }
);
module.exports = FunctionalBlock