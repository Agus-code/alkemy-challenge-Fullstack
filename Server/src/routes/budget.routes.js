const router = require('express').Router();
const controllers = require('../controllers/budget.controllers');

router.post('/create',controllers.createBudget);
router.get('/budgets=:id',controllers.getMyBudgets)
router.get('/budget=:id',controllers.getOneBudget);
router.get('/latest=:id', controllers.getMyLatestBudgets)
router.get('/id=:id/by=:filter', controllers.getMyBudgetsBy);
router.put('/budget=:id',controllers.editBudget);
router.post('/budgetDelete=:id',controllers.deleteBudget);


module.exports = router;