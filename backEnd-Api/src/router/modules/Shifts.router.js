const router = require("express").Router();
const ShiftsController = require("../../controller/Shifts.controller");

module.exports = app =>{
    router.get("/getAll",ShiftsController.getAll);
    router.get("/getAllShifts",ShiftsController.getAllShifts);
    router.post("/createShifts",ShiftsController.createShifts);
    router.put("/updateShifts/:id",ShiftsController.updateShifts);
    router.delete("/deleteShifts/:id",ShiftsController.deleteShift);

    app.use("/api/shift", router);
}
