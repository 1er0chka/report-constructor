const db = require("../../util/db");
const Sequelize = require("sequelize");
const ConsequenceType = db.define('consequenceType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Тип последствия'
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,
        },
        L4: {
            type: Sequelize.STRING,
        },
        // comment: 'Тип последствия',
    }, {
        freezeTableName: true
    }
);
module.exports = ConsequenceType