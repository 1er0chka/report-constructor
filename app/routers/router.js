module.exports = app => {
    const service = require("../services/service");

    const router = require("express").Router();

    router.get("/", service.getTableNames);

    router.get("/:tableName", service.getTableColumns);

    router.get("/:tableName/:columnName", service.getColumnValues);

    app.use("/report-create", router);
}