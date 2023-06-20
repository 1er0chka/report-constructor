module.exports = app => {
    const service = require("../services/service");

    const router = require("express").Router();

    router.get("/", service.getTableNames);

    router.get("/col", service.getTableColumns);

    router.get("/val", service.getColumnValues);

    app.use("/report-create", router);
}