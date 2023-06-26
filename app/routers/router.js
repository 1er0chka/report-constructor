const service = require("../services/service");
module.exports = app => {
    const service = require("../services/service");

    const router = require("express").Router();

    router.get("/", service.getTableNames);

    router.get("/:tableName", service.getTableColumns);

    router.post("/getTable/", service.getTableData);

    app.use("/report-create", router);
}