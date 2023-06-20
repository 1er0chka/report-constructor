const db = require("../../util/db");
const Sequelize = require("sequelize");
const Researcher = db.define('researcher_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Исследователь',
        },
        // comment: 'Исследователь',
    }, {
        freezeTableName: true
    }
);

module.exports = Researcher