const Sequelize = require('sequelize')
const db = require('../util/db');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        comment: 'Логин пользователя в системе',
        allowNull:false
    },
    firstName: {
        type: Sequelize.STRING,
        comment: 'Имя пользователя',
        defaultValue: null
    } ,
    surName: {
        type: Sequelize.STRING,
        comment: 'Отчество пользователя',
        defaultValue: null
    } ,
    lastName: {
        type: Sequelize.STRING,
        comment: 'Фамилия пользователя',
        defaultValue: null
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        comment: 'Права пользователя'
    },
    }, {
        freezeTableName: true
    }
);

module.exports = User;
