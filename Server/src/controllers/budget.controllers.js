const { validateConcept, idInDb } = require('../lib/validations');
const budgetModel = require('../models/budget.model');
const UserModel = require('../models/user.model');
const JWT = require("jsonwebtoken");

class budget {

    async createBudget(req, res) {
        try {
            const { concept, amount, category, date, type, uId } = req.body;

            //---validations---
            if (!concept || !amount || !category || !date || !type || !uId) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" });
            }
            if (validateConcept(concept.replace(/\s/g, ""))) {
                return res
                    .status(400)
                    .json({ err: "Invalid concept" });
            }
            if (typeof amount !== 'number') {
                return res
                    .status(400)
                    .json({ err: "Invalid amount" });
            }
            if (!type === "income" || !type === "expense") {
                console.log(type)
                return res
                    .status(400)
                    .json({ err: "Invalid type" });
            }
            if (await idInDb(uId)) {
                return res
                    .status(400)
                    .json({ err: "Invalid User" })
            }
            //---end validations---

            const newBudget = new budgetModel(
                {
                    bConcept: concept,
                    bAmount: amount,
                    bCategory: category,
                    bDate: date,
                    bType: type
                }
            );

            await UserModel.findByIdAndUpdate(
                uId,
                { $addToSet: { uBudgets: newBudget._id.toString() } }
            );

            await newBudget.save();

            return res
                .status(200)
                .json({ success: "budget created" });

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async getMyBudgets(req, res) {
        try {
            //---validation---
            if (!req.params.id) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" });
            }
            const tokenDecode = JWT.decode(req.params.id);
            const uId = tokenDecode.id;
            if (await idInDb(uId)) {
                return res
                    .status(400)
                    .json({ err: "Invalid User" })
            }
            //---end validations---

            const user = await UserModel.findById(uId);

            const userBudgets = user.uBudgets;

            let budgetsData = [];
            userBudgets.forEach(async (budget) => {
                const data = await budgetModel.findById(budget);
                budgetsData.push(data);

                if (budgetsData.length === userBudgets.length) {
                    return res
                        .status(200)
                        .json(budgetsData)
                }
            });

            if (userBudgets.length === 0) return res
                .status(200)
                .json("no one")


        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async getMyLatestBudgets(req, res) {
        try {
            //---validation---
            if (!req.params.id) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" });
            }
            const tokenDecode = JWT.decode(req.params.id);
            const uId = tokenDecode.id;

            if (await idInDb(uId)) {
                return res
                    .status(400)
                    .json({ err: "Invalid User" })
            }
            //---end validations---

            const user = await UserModel.findById(uId);

            const userBudgets = user.uBudgets;

            let budgetsData = [];
            for (let i = userBudgets.length - 1; i >= 0; i--) {
                const data = await budgetModel.findById(userBudgets[i]);
                budgetsData.push(data)
                if (i === 0 || budgetsData.length === 10) {
                    return res
                        .status(200)
                        .json(budgetsData)
                }
            }

            return res
                .status(200)
                .json({ info: "no budgets" })

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async totalBudgets(req, res) {
        try {
            //---validation---
            if (!req.params.id) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" });
            }
            const tokenDecode = JWT.decode(req.params.id);
            const uId = tokenDecode.id;

            if (await idInDb(uId)) {
                return res
                    .status(400)
                    .json({ err: "Invalid User" })
            }
            //---end validations---

            const user = await UserModel.findById(uId);
            let totalSalary = 0;
            const userBudgets = user.uBudgets;

            for (let i = userBudgets.length - 1; i >= 0; i--) {
                const data = await budgetModel.findById(userBudgets[i]);
                if (data.bType === "income") {
                    totalSalary = totalSalary + data.bAmount;
                }
                if (data.bType === "expense") {
                    totalSalary = totalSalary - data.bAmount;
                }
                if (i === 0) {
                    return res
                        .status(200)
                        .json(totalSalary)
                }
            }
            return res
                .status(200)
                .json(totalSalary)

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async editBudget(req, res) {
        try {
            const { concept, amount, category, date } = req.body;

            if (!concept || !amount || !category || !date || !req.params.id) {
                return res
                    .status(400)
                    .json({ err: "Complete fields" })
            }

            //---validations---
            const bId = req.params.id;
            const budgetData = await budgetModel.findById(bId);
            if (!budgetData) {
                return res
                    .status(400)
                    .json({ err: "Invalid budget" });
            }
            if (validateConcept(concept.replace(/\s/g, ""))) {
                return res
                    .status(400)
                    .json({ err: "Invalid concept" });
            }
            if (typeof amount !== 'number') {
                return res
                    .status(400)
                    .json({ err: "Invalid amount" });
            }
            //---end validations--- 


            await budgetModel.findByIdAndUpdate(bId,
                {
                    bConcept: concept,
                    bAmount: amount,
                    bCategory: category,
                    bDate: date
                }
            );

            return res
                .status(200)
                .json({ success: "Budget Updated" });

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }

    async deleteBudget(req, res) {
        try {

            const { uId } = req.body;

            //---validations---
            if (!uId || !req.params.id) {
                return res
                    .status(200)
                    .json({ err: "Complete fields" })
            }

            const tokenDecode = JWT.decode(uId);
            const id = tokenDecode.id;
            if (await idInDb(id)) {
                return res
                    .status(400)
                    .json({ err: "Invalid User" })
            }
            //---end validations---

            await UserModel.findByIdAndUpdate(id,
                { $pull: { uBudgets: req.params.id } }
            );

            await budgetModel.findOneAndRemove(req.params.id);

            return res
                .status(200)
                .json({ success: "Budget deletes" })

        }
        catch (err) {
            console.log(err);
            return res
                .status(500);
        }
    }
}

const controllers = new budget;

module.exports = controllers;