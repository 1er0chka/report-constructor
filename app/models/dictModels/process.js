const db = require("../../util/db");
const Sequelize = require("sequelize");
const Process = db.define('process_dict', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    L1: {
        type: Sequelize.STRING,
    },
    L2: {
        type: Sequelize.STRING,
    },
    L3: {
        type: Sequelize.STRING,
        comment: 'Процессная область',
    },
    L4: {
        type: Sequelize.STRING,
        comment: 'Процесс',
    },
    L5: {
        type: Sequelize.STRING,
        comment: 'Этап процесса',
    },
    // comment: 'Процесс словарь',
    }, {
        freezeTableName: true
    }
);
module.exports = Process