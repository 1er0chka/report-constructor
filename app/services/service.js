const db = require("../util/db");
const modelMapping = require("../models/mapping/modelMapping");
const e = require("express");
const schemaName = require("../config/db.config").schema;

exports.getTableData = (req, res) => {
    if (Object.keys(req.body.tables).length === 1) {
        getFirstTable(req.body.tables, res);
    } else {
        makeQueryGetTables(req.body.tables, res)
    }
}

function getFirstTable(tableData, res) {
    const tableName = Object.keys(tableData)[0];
    const columnNames = tableData[tableName];
    const columns = columnNames.map(column => `"${column}"`).join(',');
    db.query(`SELECT ${columns} FROM "${schemaName}"."${tableName}"`, {type: db.QueryTypes.SELECT})
        .then(rows => {
            const result = {};
            columnNames.forEach((column, index) => {
                result[column] = rows.map(row => row[column]);
            });
            addAssociatedTablesToResponse(res, result, tableData);
        })
        .catch((error) => {
            console.error("Error while fetching column rows:", error);
            res.status(500).json({error: "Error while fetching column rows:"});
        });
}

function makeQueryGetTables(tableData, res) {
    let query = `SELECT `;
    let joinConditions = '';
    for (const tableName in tableData) {
        const columns = tableData[tableName];
        query += columns.map(column => `${schemaName}."${tableName}"."${column}", `).join('');
        if (Object.keys(tableData).length > 1) {
            for (const prevTable in tableData) {
                const hasField = getModel(tableName).rawAttributes.hasOwnProperty(convertToCamelCase(prevTable) + "Id");
                if (hasField) {
                    if (prevTable !== tableName) {
                        let temp = joinConditions;
                        joinConditions = `LEFT JOIN ${schemaName}."${prevTable}" ON ${schemaName}."${tableName}"."${convertToCamelCase(prevTable)}Id" = ${schemaName}."${prevTable}".id ` + temp;
                    }
                }
            }
        }
    }
    query = query.slice(0, -2);
    for (const tableName in tableData) {
        if (joinConditions.includes(`LEFT JOIN ${schemaName}."${tableName}`)) {
            continue;
        }
        query += ` FROM ${schemaName}."${tableName}" ${joinConditions};`;
        break;
    }
    console.log(query);
    executeQuery(tableData, query, res);
}

async function executeQuery(tables, query, res) {
    try {
        const [results, metadata] = await db.query(query);
        const result = {};
        for (const key of Object.keys(results[0])) {
            result[key] = results.map(obj => obj[key]);
        }
        addAssociatedTablesToResponse(res, result, tables)
    } catch (error) {
        console.error('Error occurred during query execution:', error);
        res.json({error: "Error occurred during query execution"});
    }
}

async function addAssociatedTablesToResponse(res, data, tables) {
    let allTables = [];
    await db.getQueryInterface().showAllTables({schema: schemaName})
        .then(result => {
            allTables = result;
        })
        .catch((error) => {
            console.error("Error while fetching table names:", error);
            res.status(500).json({error: "Error while fetching table names:"});
        });
    let associatedTables = [];
    for (const table in tables) {
        associatedTables.push(table);
        console.log(table);
        const Model = getModel(table);
        for (let i = 0; i < allTables.length; i++) {
            const OtherModel = getModel(allTables[i]);
            try {
                await Model.findAll({include: OtherModel});
                associatedTables.push(allTables[i]);
            } catch (error) {
            }
        }
    }
    associatedTables = [...new Set(associatedTables)];
    const response = {
        tables: associatedTables,
        data: data
    };
    res.json(response);
}

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
            console.log(model);
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

const getModel = (modelName) => {
    const modelPath = modelMapping[modelName];
    if (!modelPath) {
        throw new Error(`The path for the model ${modelName} is not found in the mapping.`);
    }
    return require(modelPath);
};

function convertToCamelCase(str) {
    const parts = str.split('_');
    const camelCaseParts = parts.map((part, index) => {
        if (index === 0) {
            return part;
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
    });
    return camelCaseParts.join('');
}

