const router = require("express").Router();
const UsersController = require("../../controller/Users.controller");

module.exports = app =>{
    router.get("/getAll",UsersController.getAll);
    // router.get("/getAllUsers",UsersController.getAllUsers);
    router.post("/createUsers",UsersController.createUsers);
    router.put("/updateUsers/:id",UsersController.updateUsers);
    router.delete("/deleteUsers/:id",UsersController.deleteUsers);

    app.use("/api/users", router);
}
