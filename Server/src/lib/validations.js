const UserModel = require('./../models/user.model')
const bcrypt = require('bcrypt');

exports.validateEmail = function (email) {
    const chars = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (chars.test(email.toLowerCase())) return false; //valid
    return true; //invalid
}

exports.validateUsername = function (username) {
    const chars = /^[0-9a-zA-Z]+$/;
    if (chars.test(username)) return false; //valid
    return true; //invalid
}

exports.usernameInDb = async function (username) {
    const data = await UserModel.findOne({ uUsername: username });
    if (data) return true; //user in db
    return false; //user not in db
}

exports.emailInDb = async function (email) {
    const data = await UserModel.findOne({ uEmail: email });
    if (data) return true; //email in db
    return false; //email not in db
}

exports.validLogIn = async function (email, password) {
    const data = await UserModel.findOne({ uEmail: email });
    if(!data) return true //invalid email

    const passwordUserDb = data.uPassword;
    const validPassword = await bcrypt.compare(password,passwordUserDb);
    return !validPassword; //true: valid password || false: invalid password
}

exports.idInDb = async function (id) {
    const data = await UserModel.findById(id);
    if (data) return false; //id in db
    return true; //not in db
}

exports.validateConcept = function (txt) {
    const chars = /^[0-9a-zA-Z]+$/;
    if (chars.test(txt)) return false; //valid
    return true; //invalid
}