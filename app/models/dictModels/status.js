const db = require("../../util/db");
const Sequelize = require("sequelize");
const status = db.define('status_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: "статус"

        },
    }, {
        freezeTableName: true
    }
);

module.exports = status