const db = require("../../util/db");
const Sequelize = require("sequelize");
const RepaymentTypeGroup = db.define('repaymentTypeGroup_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Тип возмещения (по Группе)',
        },
        // comment: 'Тип возмещения (по Группе)',
    }, {
        freezeTableName: true
    }
);
module.exports = RepaymentTypeGroup