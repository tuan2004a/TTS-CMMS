const AuthRouter = require('./modules/Auth.router');
const RolesRouter = require('./modules/Roles.router');
const ShiftsRouter = require('./modules/Shifts.router');
const UsersRouter = require('./modules/Users.router');
const WorkRouter = require('./modules/Work.router');

module.exports = function (app) {
    AuthRouter(app)
    RolesRouter(app)
    ShiftsRouter(app)
    UsersRouter(app)
    WorkRouter(app)
}