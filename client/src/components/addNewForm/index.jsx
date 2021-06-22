import React from "react";
import { useHistory } from 'react-router-dom'
import './style.scss'
import axios from 'axios'

const AddNewForm = ({ uId }) => {

    const [concept, setConcept] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [category, setCategory] = React.useState('house');
    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');

    const history = useHistory();

    const handleAddNew = async (e) => {
        e.preventDefault();

        if (
            concept.length < 1 ||
            amount < 1 ||
            date.length < 1 ||
            type.length < 1
        ) {
            return;
        }

        const data = {
            concept,
            amount: parseInt(amount),
            category,
            date,
            type,
            uId
        }

        await axios.post('http://localhost:4000/api/budget/create', data)
            .then(() => history.push("/"))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="addNewForm">
                <div className="addNewForm__container">
                    <header className="addNewForm__header">
                        <h2 className="addNewForm__header-h2">
                            Add New
                        </h2>
                    </header>
                    <form className="addNewForm__form" onSubmit={handleAddNew}>
                        <div className="addNewForm__form-item">
                            <input
                                type="text"
                                placeholder="Concept..."
                                className="addNewForm__form-item-input"
                                value={concept}
                                onChange={e => setConcept(e.target.value)}
                            />
                        </div>
                        <div className="addNewForm__form-item">
                            <span className="addNewForm__form-item-span">
                                Amount: $
                            </span>
                            <input
                                type="number"
                                placeholder="Amount..."
                                className="addNewForm__form-item-input input-number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="addNewForm__form-item item-select">
                            <span className="addNewForm__form-item-span">
                                Category:
                            </span>
                            <select
                                type="date"
                                className="addNewForm__form-item-input input-select"
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="house" className="addNewForm__form-item-input-option">House</option>
                                <option value="car" className="addNewForm__form-item-input-option">Car</option>
                                <option value="job" className="addNewForm__form-item-input-option">Job</option>
                                <option value="food" className="addNewForm__form-item-input-option">Food</option>
                                <option value="vacations" className="addNewForm__form-item-input-option">Vacations</option>
                                <option value="clothing" className="addNewForm__form-item-input-option">Clothing</option>
                                <option value="technology" className="addNewForm__form-item-input-option">Technology</option>
                                <option value="other" className="addNewForm__form-item-input-option">Other</option>
                            </select>
                        </div>
                        <div className="addNewForm__form-item">
                            <span className="addNewForm__form-item-span">
                                Date:
                            </span>
                            <input
                                type="date"
                                placeholder="Date..."
                                className="addNewForm__form-item-input input-date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                        <div className="addNewForm__form-item item-radio" onChange={e => setType(e.target.value)}>
                            <input type="radio" value="income" className="addNewForm__form-item-input input-radio" name="type" />
                            <label className="addNewForm__form-item-input-label">Income</label>
                            <input type="radio" value="expense" className="addNewForm__form-item-input input-radio" name="type" />
                            <label className="addNewForm__form-item-input-label">Expense</label>
                        </div>
                        <div className="addNewForm__form-submit">
                            <button className="addNewForm__form-submit-btn">
                                ADD
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewForm;