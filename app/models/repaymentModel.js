const db = require("../util/db");
const Sequelize = require("sequelize");
const Repayment = db.define('repayment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    repaymentSum: {
        type: Sequelize.FLOAT,
        comment: 'Сумма возмещения ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    repaymentSumBYN: {
        type: Sequelize.FLOAT,
        comment: 'Сумма возмещения BYN',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    repaymentSumRUB: {
        type: Sequelize.FLOAT,
        comment: 'Сумма возмещения RUB',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    lossAfterRepaymentIorCurrency: {
        type: Sequelize.FLOAT,
        comment: 'Потери после возмещения в валюте ИОР ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    lossAfterRepaymentBYN: {
        type: Sequelize.FLOAT,
        comment: 'Потери после возмещения в  BYN ',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    },
    repaymentDate:{
        type: Sequelize.DATEONLY,
        comment: 'Дата отражения возмещения в бух.учете ',
        defaultValue: null,
        validate:{
            isDate: true
        }
    },
    analyticalCalculation: {
        type: Sequelize.FLOAT,
        comment: 'Аналитический счет отражения возмещения в учете',
        defaultValue: 0,
        validate:{
            isFloat :true
        }
    }
    // comment: 'Возмещения'
}, {
    freezeTableName: true
})

module.exports = Repayment