const router = require('express').Router();
const controllers = require('./../controllers/user.controllers');


router.get('/',controllers.getUsers)
router.post('/signup',controllers.createUser);
router.post('/signin',controllers.logUser);
router.get('/user=:id',controllers.getMyUser);

module.exports = router;