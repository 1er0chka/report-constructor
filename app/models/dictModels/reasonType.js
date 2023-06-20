const db = require("../../util/db");
const Sequelize = require("sequelize");
const ReasonType = db.define('reasonType_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        L1: {
            type: Sequelize.STRING,
            comment: 'Классификатор причины',
        },
        L2: {
            type: Sequelize.STRING,
        },
        L3: {
            type: Sequelize.STRING,

        },
        // comment: 'Тип и классификатор причины',
    }, {
        freezeTableName: true
    }
);
module.exports = ReasonType