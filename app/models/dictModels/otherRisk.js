const db = require("../../util/db");
const Sequelize = require("sequelize");
const OtherRisk = db.define('otherRiskConn_dict', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        info: {
            type: Sequelize.STRING,
            comment: 'Связть с другими видами риска',
        },

    }, {
        freezeTableName: true
    }
);
module.exports = OtherRisk