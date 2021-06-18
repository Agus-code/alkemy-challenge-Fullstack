const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
    {
        bConcept: {
            type: String,
            require: true
        },
        bAmount: {
            type: Number,
            require: true
        },
        bCategory: {
            type: String,
            require: true
        },
        bDate: {
            type: String,
            require: true
        },
        bType: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const BudgetModel = mongoose.model('Budgets',budgetSchema);

module.exports = BudgetModel;