const Sequelize = require('sequelize')
const db = require('../util/db');
const Effort = db.define('effort', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        effortRealisationDate: {
            type: Sequelize.DATEONLY,
            comment: 'Срок реализации меры',
            validate:{
                isDate:true
            }
        },
        effortDescription: {
            type: Sequelize.STRING,
            comment: 'Описание меры',
            default: null
        } ,
    }, {
        freezeTableName: true
    }
);

module.exports = Effort