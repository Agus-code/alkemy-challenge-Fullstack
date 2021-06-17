const router = require('express').Router();
const controllers = require('./../controllers/user.controllers');


router.post('/signup',controllers.createUser);

module.exports = router;