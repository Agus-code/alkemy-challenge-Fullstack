const JWT = require('jsonwebtoken');
const { JWT_CODE } = require('./../lib/config')

class Auth {
    async logged(req, res) {
        try {
            const { token } = req.body;

            const valid = JWT.verify(token,JWT_CODE);

            if (!token || valid === false) {
                return res
                    .json(false);
            }
            return res
                .json(true);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }
}

const controllers = new Auth;

module.exports = controllers;