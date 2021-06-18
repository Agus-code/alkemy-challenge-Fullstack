const { validateUsername, validateEmail, usernameInDb, emailInDb, validLogIn, idInDb } = require('./../lib/validations')
const bcrypt = require('bcrypt');
const UserModel = require('./../models/user.model')
const JWT = require('jsonwebtoken');
const { JWT_CODE } = require('./../lib/config')

class User {

    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password)
                return res
                    .status(400)
                    .json({ err: "Complete fields" });

            //---validations---
            if (username.length < 5) {
                return res
                    .status(400)
                    .json({ err: "Username more than 5 characters" });
            }
            if (validateUsername(username)) {
                return res
                    .status(400)
                    .json({ err: "Invalid username" });
            }
            if (await usernameInDb(username)) {
                return res
                    .status(400)
                    .json({ err: "Username in database" });
            }
            if (validateEmail(email)) {
                return res
                    .status(400)
                    .json({ err: "Invalid emal" });
            }
            if (await emailInDb(email)) {
                return res
                    .status(400)
                    .json({ err: "Email in database" });
            }
            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ err: "Password more than 6 characters" });
            }
            //---end validations---

            //hassPassword
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);


            //import user in database
            const newUser = new UserModel(
                {
                    uUsername: username,
                    uEmail: email,
                    uPassword: hashPassword
                }
            )

            await newUser.save();

            return res
                .status(200)
                .json({ success: "Create User" });

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async logUser(req, res) {
        try {
            const { email, password } = req.body;

            //---validaitons---
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" });
            }
            if (await validLogIn(email, password)) {
                return res
                    .status(400)
                    .json({ err: "Email or password incorrect" });
            }
            //---end validation---

            //Get User ID
            const user = await UserModel.findOne({ uEmail: email });
            const userID = user._id;

            //Create Token
            const token = JWT.sign({ id: userID }, JWT_CODE)

            return res
                .status(200)
                .json(
                    {
                        success: "User Logged",
                        token: token
                    }
                );
        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async getMyUser(req, res) {
        try {
            if (!req.params.id) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" })
            }
            if (await idInDb(id)) {
                return res
                    .status(400)
                    .json({ err: "Invalid ID" });
            }

            const user = await UserModel.findById(req.params.id);
            const data = {
                username : user.uUsername,
            }
            return res
                .status(200)
                .json(data);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async getUsers(req,res){
        try{
            const data = await UserModel.find();
            return res
                .status(200)
                .json(data);
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