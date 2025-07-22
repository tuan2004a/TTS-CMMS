const router = require("express").Router();
const WorkController = require("../../controller/Work.controller");

module.exports = app => {
    router.get("/getAll", WorkController.getAll);
    router.post("/create", WorkController.create);
    router.put("/update/:id", WorkController.update);
    router.delete("/delete/:id", WorkController.delete);

    app.use("/api/work", router);
} 