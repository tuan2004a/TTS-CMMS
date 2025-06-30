const router = require("express").Router();
const AutherController =  require("../../controller/Auth.controller");


module.exports = app =>{
    router.post("/dang-ky",AutherController.register);
    router.post("/dang-nhap",AutherController.login);

    app.use("/api/auth", router);
}