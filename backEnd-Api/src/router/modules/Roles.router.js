const router = require("express").Router();
const RolesController = require("../../controller/Roles.controller");

module.exports = app =>{
    router.get("/getAll",RolesController.getAll);
    router.post("/createRole",RolesController.CreateRole);
    router.put("/updateRole/:id",RolesController.UpdateRole);
    router.delete("/deleteRole/:id",RolesController.DeleteRole);

    app.use("/api/role", router);
}