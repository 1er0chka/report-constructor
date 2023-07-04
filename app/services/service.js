const db = require("../util/db");
const modelMapping = require("../models/mapping/modelMapping");
const e = require("express");
const {event} = require("../models/mapping/modelMapping");
const schemaName = require("../config/db.config").schema;

exports.getTableData = async (req, res) => {
    if (Object.keys(req.body.tables).length === 1) {
        getFirstTable(req.body.tables, res);
    } else {
        const associations = getParentsWithChild(req.body.tables);
        const first = getFirst(req.body.tables, associations);
        let include = [];
        include = generateIncludeNode(req.body.tables, first, associations, include);
        /* по возможности 13-14 заменить на
        * let include = generateIncludeNode(data, first, parentsWithChild, []);
        * */
        const table = await getTableData(first, include, req.body.tables);
        const columnsWithValues = getColumnsWithValues(table);
        console.log(columnsWithValues)
        addAssociatedTablesToResponse(res, columnsWithValues, req.body.tables);
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

function getParentsWithChild(data) {
    // {родитель: дите}
    let parentsWithChild = {};
    // получение списка родителей - детей
    for (const tableName in data) {
        parentsWithChild[tableName] = (Object.keys(data).filter(otherTableName => {
            return getModel(tableName).rawAttributes.hasOwnProperty(convertToCamelCase(otherTableName) + "Id")
        }));
    }
    return parentsWithChild;
}

function getFirst(data, parentsWithChild) {
    let first = null;
    console.log(parentsWithChild)
    for (const tableName in data) {
        let isFirst = true;
        // является ли "первым" = не должно быть родителей
        Object.values(parentsWithChild).map(childs => {
            if (childs.includes(tableName)) {
                isFirst = false;
            }
        })
        // если элемент без родителей
        if (isFirst) {
            // и при этом основная модель еще не выбрана
            if (first === null) {
                first = tableName;
            } else {
                // тогда сделать ребенка родителем
                parentsWithChild[parentsWithChild[tableName][0]].push(tableName);
                parentsWithChild[tableName].splice(0, 1);
            }
        }
    }
    return first;
}

async function getTableData(first, include, data) {
    return getModel(first).findAll({
            raw: true,
            include: include,
            attributes: data[first],
        }
    ).then((result) => {
        return result;
    })
    //return [];
}

function getColumnsWithValues(table) {
    let columnsWithValues = {};
    for (let row = 0; row < table.length; row++) {
        for (let columnName in table[row]) {
           // const newName = columnName.split('\.').pop();
            const parts = columnName.split('.'); // Разделение строки по точкам
            const newName = parts.length > 1 ? parts.slice(-2).join('.') : columnName; // Проверка количества частей и применение slice() только в случае, если есть две или более части

            if (Object.keys(columnsWithValues).includes(newName)) {
                columnsWithValues[newName].push(table[row][columnName]);
            } else {
                columnsWithValues[newName] = [table[row][columnName]];
            }
        }
    }
    console.log(columnsWithValues)
    return columnsWithValues;
}

function generateIncludeNode(data, table, parentsWithChild, include) {
    if (parentsWithChild[table] !== undefined) {
        return include = parentsWithChild[table].map(child => {
            return {
                model: getModel(child),
                raw: true,
                attributes: data[child],
                include: generateIncludeNode(data, child, parentsWithChild, include),
            }
        })
    } else return [];
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