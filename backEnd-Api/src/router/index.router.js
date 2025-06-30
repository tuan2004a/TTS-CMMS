const AuthRouter = require('./modules/Auth.router');
const RolesRouter = require('./modules/Roles.router');
const ShiftsRouter = require('./modules/Shifts.router');
const UsersRouter = require('./modules/Users.router');

module.exports = function (app) {
    AuthRouter(app)
    RolesRouter(app)
    ShiftsRouter(app)
    UsersRouter(app)
}