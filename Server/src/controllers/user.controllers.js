class User {

    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;
        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }
}

const controllers = new User;
module.exports = controllers;