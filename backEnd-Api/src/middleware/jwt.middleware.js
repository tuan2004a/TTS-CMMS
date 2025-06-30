const JWT = require('../helper/jwt.helper')

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = JWT.verify(token, 'ACCESS')
    req.user = decoded
    next()
}

module.exports = jwtMiddleware