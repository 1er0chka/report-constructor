const db = require("../util/db");
const modelMapping = require("../models/mapping/modelMapping");
const schemaName = require("../config/db.config").schema;

const getModel = (modelName) => {
    const modelPath = modelMapping[modelName];
    if (!modelPath) {
        throw new Error(`The path for the model ${modelName} is not found in the mapping.`);
    }
    const Model = require(modelPath);
    return Model;
};

exports.getTableNames = (req, res) => {
    db.getQueryInterface().showAllTables({schema: schemaName})
        .then(tables => {
            const response = {
                tables: tables,
            };
            res.json(response);
        })
        .catch((error) => {
            console.error("Error while fetching table names:", error);
            res.status(500).json({error: "Error while fetching table names:"});
        });
}

exports.getTableColumns = (req, res) => {
    const tableName = req.params.tableName;
    db.getQueryInterface().describeTable(tableName, {schema: schemaName})
        .then(columns => {
            const model = getModel(tableName);
            // create a map with comment as the key and the corresponding field name in the model as the value.
            const columnMapping = Object.values(model.rawAttributes).reduce((map, column) => {
                if (column.comment) {
                    map[column.comment] = column.field;
                }
                return map;
            }, {});
            const response = {
                columns: columnMapping,
            };
            res.json(response);
        })
        .catch((error) => {
            console.error("Error while fetching table columns:", error);
            res.status(500).json({error: "Error while fetching table columns:"});
        });
}


exports.getColumnValues = (req, res) => {
    const tableName = req.params.tableName;
    const columnName = req.params.columnName;

    db.query(`SELECT "${columnName}" FROM "${schemaName}"."${tableName}"`, {type: db.QueryTypes.SELECT})
        .then(rows => {
            const response = {
                rows: rows.map(row => row[columnName]),
            };
            res.json(response);
        })
        .catch((error) => {
            console.error("Error while fetching column rows:", error);
            res.status(500).json({error: "Error while fetching column rows:"});
        });
}
