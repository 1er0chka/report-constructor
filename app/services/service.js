const db = require("../util/db");

exports.getTableNames = (req, res) => {
    db.getQueryInterface().showAllTables({schema: 'models'})
        .then(tables => {
            console.log(tables);
        });
}

exports.getTableColumns = (req, res) => {
    db.getQueryInterface().describeTable('user', {schema: 'models'})
        .then(columns => {
            console.log(Object.keys(columns));
        });
}

exports.getColumnValues = (req, res) => {
    const tableName = 'user';
    const columnName = 'username';
    const schemaName = 'models';

    db.query(`SELECT "${columnName}" FROM "${schemaName}"."${tableName}"`, { type: db.QueryTypes.SELECT })
        .then(rows => {
            console.log(rows.map(row => row[columnName]));
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
}
