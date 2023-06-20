const db = require("../../util/db");
const Sequelize = require("sequelize");
const RiskType = db.define('riskType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Вид риска (по Инструкции №550)',
        },

    }, {
        freezeTableName: true
    }
);
module.exports = RiskType