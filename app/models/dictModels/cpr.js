const db = require("../../util/db");
const Sequelize = require("sequelize");
const Cpr = db.define('cpr_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'ЦПР'

        },
    // comment: 'ЦПР',
    }, {
        freezeTableName: true
    }
);
module.exports = Cpr