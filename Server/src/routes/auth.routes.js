const router = require('express').Router();
const controllers = require('./../controllers/auth.controllers')

router.post('/',controllers.logged);

module.exports = router;