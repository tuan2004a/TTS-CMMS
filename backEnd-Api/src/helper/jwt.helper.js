const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const JWT = {
    sign: ({ payload, expiresIn = '1h', type }) => {
        switch (type) {
            case 'ACCESS':
                return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn, algorithm: 'HS256' })
            case 'REFRESH':
                return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn, algorithm: 'HS256' })
        }
    },
    verify: (token, type) => {
        switch (type) {
            case 'ACCESS':
                return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
            case 'REFRESH':
                return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET)
        }
    }
}

module.exports = JWT