const router = require('express').Router();
const controllers = require('../controllers/budget.controllers');

router.post('/create',controllers.createBudget);
router.get('/total=:id',controllers.totalBudgets)
router.get('/budgets=:id',controllers.getMyBudgets)
router.get('/latest=:id', controllers.getMyLatestBudgets)
router.put('/budget=:id',controllers.editBudget);
router.post('/budgetDelete=:id',controllers.deleteBudget);


module.exports = router;