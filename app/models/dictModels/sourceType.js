const db = require("../../util/db");
const Sequelize = require("sequelize");
const SourceType = db.define('sourceType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Источник риска (тип события)',

        },
        L2: {
            type: Sequelize.STRING,
        },

    }, {
        freezeTableName: true
    }
);
module.exports = SourceType