const db = require("../../util/db");
const Sequelize = require("sequelize");
const RepaymentType = db.define('repaymentType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Вид возмещения (по Инструкции №550)',
        },
        // comment: 'Вид возмещения (по Инструкции №550)',
    }, {
        freezeTableName: true
    }
);
module.exports = RepaymentType