const Sequelize = require('sequelize')
const db = require('../util/db');
const sequelize = require("../util/db");
const Event = db.define('event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    shortDescription: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'Краткое описание ИОР'
    },
    fullDescription: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'Полное описание ИОР'
    },
    startEventDate:{
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        comment: 'Дата начала события',
        validate:{
            isDate: true
        }
    },
    endEventDate: {
        type: Sequelize.DATEONLY,
        defaultValue: null,
        comment: 'Дата окончания события',
        validate:{
            isDate: true
        }
    },
    pmNotificationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: null,
        comment: 'Дата уведомления PM',
        validate:{
            isDate: true
        }
    },
    locationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        comment: 'Дата обнаружения',
        validate:{
            isDate: true
        }
    },
    registrationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
        comment: 'Дата регистрации',
        validate:{
            isDate: true
        }
    },
    researchDuration: {
        type: Sequelize.DATEONLY,
        defaultValue: null,
        comment: 'Срок исследования',
        validate:{
            isDate: true
        },
    },
    },{
        sequelize,
        timestamps: true,
        freezeTableName:true
    }
);
module.exports = Event;
