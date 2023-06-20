const db = require("../../util/db");
const Sequelize = require("sequelize");
const DefenceLine = db.define('defenceLine_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Функциональный блок'
        },
    // comment: 'Функциональный блок',
    }, {
        freezeTableName: true
    }
);
module.exports = DefenceLine