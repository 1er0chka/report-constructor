const Sequelize = require('sequelize')
const db = require('../util/db');
const sequelize = require("../util/db");

const Reason = db.define('reason', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: null,
            comment: 'Описание причины'
        }
    }, {
        freezeTableName: true
    }
);

module.exports = Reason;
