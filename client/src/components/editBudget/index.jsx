import React from 'react'
import './style.scss'
import axios from 'axios'

export const EditBudget = ({ oDate, oConcept, oType, oCategory, oAmount, id, closeEdit, getData }) => {

    const [concept, setConcept] = React.useState(oConcept);
    const [amount, setAmount] = React.useState(oAmount);
    const [category, setCategory] = React.useState(oCategory);
    const [date, setDate] = React.useState(oDate);

    const handleEdit = (e) => {
        e.preventDefault();

        const data = {
            concept,
            amount: parseInt(amount),
            category,
            date
        }

        axios.put(`http://localhost:4000/api/budget/budget=${id}`,data)
            .then(()=>closeEdit(),getData())
            .catch(err=>console.log(err))
    }

    return (
        <section className="edit">
            <div className="edit__container">
                <div className="edit__box">
                    <header className="edit__box-header">
                        <div className="edit__box-header-title">
                            <h2 className="edit__box-header-title-h2">
                                Edit
                            </h2>
                        </div>
                        <div className="edit__box-header-close">
                            <i className="edit__box-header-close-i fas fa-times-circle" onClick={() => closeEdit()}></i>
                        </div>
                    </header>
                    <form className="edit__box-form" onSubmit={handleEdit}>
                        <div className="edit__box-form-item">
                            <input
                                type="text"
                                placeholder="Concept..."
                                className="edit__box-form-item-input"
                                value={concept}
                                onChange={e => setConcept(e.target.value)}
                            />
                        </div>
                        <div className="edit__box-form-item">
                            <span className="edit__box-form-item-span">
                                Amount: $
                            </span>
                            <input
                                type="number"
                                placeholder="Amount..."
                                className="edit__box-form-item-input input-number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="edit__box-form-item item-select">
                            <span className="edit__box-form-item-span">
                                Category:
                            </span>
                            <select
                                type="date"
                                className="edit__box-form-item-input input-select"
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="house" className="edit__box-form-item-input-option">House</option>
                                <option value="car" className="edit__box-form-item-input-option">Car</option>
                                <option value="job" className="edit__box-form-item-input-option">Job</option>
                                <option value="food" className="edit__box-form-item-input-option">Food</option>
                                <option value="vacations" className="edit__box-form-item-input-option">Vacations</option>
                                <option value="clothing" className="edit__box-form-item-input-option">Clothing</option>
                                <option value="technology" className="edit__box-form-item-input-option">Technology</option>
                                <option value="other" className="edit__box-form-item-input-option">Other</option>
                            </select>
                        </div>
                        <div className="edit__box-form-item">
                            <span className="edit__box-form-item-span">
                                Date:
                            </span>
                            <input
                                type="date"
                                placeholder="Date..."
                                className="edit__box-form-item-input input-date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                        <div className="edit__box-form-item item-radio">
                            {oType === "income" &&
                                <>
                                    <input
                                        type="radio"
                                        value="income"
                                        className="edit__box-form-item-input input-radio"
                                        name="type"
                                        disabled="true"
                                        checked={true}
                                    />
                                    <label className="edit__box-form-item-input-label">Income</label>
                                </>
                            }
                            {oType === "expense" &&
                                <>
                                    <input
                                        type="radio"
                                        value="expense"
                                        className="edit__box-form-item-input input-radio"
                                        name="type"
                                        disabled="true"
                                        checked={true}
                                    />
                                    <label className="edit__box-form-item-input-label">Expense</label>
                                </>
                            }
                        </div>
                        <div className="edit__box-form-submit">
                            <button className="edit__box-form-submit-btn">
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditBudget;
