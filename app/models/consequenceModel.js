const Sequelize = require('sequelize')
const db = require('../util/db');

const Consequence = db.define('consequence',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    consequenceSum: {
        type: Sequelize.FLOAT,
        comment: 'Сумма последствия ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    consequenceSumBYN: {
        type: Sequelize.FLOAT,
        comment: 'Сумма последствия в BYN ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    consequenceSumRUB: {
        type: Sequelize.FLOAT,
        comment: 'Сумма последствия в RUB ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    consequenceDate:{
        type: Sequelize.DATEONLY,
        comment: 'Дата отражения потерь в бух.учете ',
        defaultValue: null,
        validate:{
            isDate: true
        }
    },
    analyticalCalculation: {
        type: Sequelize.FLOAT,
        comment: 'Аналитический счет отражения потерь в учете ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    fullFormDeadline: {
        type: Sequelize.DATEONLY,
        comment: 'Срок предоставления полной формы ВП ',
        defaultValue: null,
        validate:{
            isDate: true
        }
    }
}, {
    freezeTableName: true
})
module.exports = Consequence