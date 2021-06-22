import React from 'react';
import { useHistory } from 'react-router-dom'
import './style.scss';
import Navbar from '../../components/NavBar';
import AuthContext from './../../provider/AuthProvider';
import axios from 'axios';
import MovementsTr from './MovementsTr';


const Movements = () => {

    const [budgets, setBudgets] = React.useState();
    const [options, setOptions] = React.useState();
    const [activeFilter, setActiveFilter] = React.useState('none');
    const [typeFilter, setTypeFilter] = React.useState('none');

    const { isLogged, getLogged } = React.useContext(AuthContext);

    const history = useHistory();

    const generateOptions = () => {
        if (budgets === "no one") return;
        let optionsData = [];
        budgets?.map(budget => optionsData.push(budget.bCategory));
        let options = [...new Set(optionsData)];
        setOptions(options);
    }

    const getData = async () => {
        await axios.get(`http://localhost:4000/api/budget/budgets=${localStorage.getItem("token")}`)
            .then(res => setBudgets(res.data))
            .then(() => generateOptions())
            .catch(err => console.log(err))
    }



    React.useEffect(() => {
        getLogged();
    })

    React.useEffect(() => {
        if (isLogged === false) return history.push("/login");
    })

    React.useEffect(() => {
        getData();
    }, [])

    React.useEffect(() => {
        generateOptions();
    }, [budgets])

    return (
        <>
            <Navbar />
            <section className="movements">
                <div className="movements__container">

                    {budgets === undefined && budgets !== "no one" && options === undefined &&
                        <div className="movements__loading">
                            <div className="movements__loading-circle"></div>
                        </div>
                    }
                    {budgets !== undefined && budgets !== "no one" && options !== undefined &&
                        <div className="movements__box">
                            <div className="movements__box-title">
                                <h2 className="movements__box-title-h2">
                                    My movements
                                </h2>
                            </div>
                            <div className="movements__box-options">
                                <div className="movements__box-options-filter">
                                    <form className="movements__box-options-filter-form" onChange={e => setTypeFilter(e.target.value)}>

                                        <div className="movements__box-options-filter-form-item">
                                            <span className="movements__box-options-filter-form-item-span">
                                                Filter by type
                                            </span>
                                            <select className="movements__box-options-filter-form-item-input input-select" defaultValue="None">
                                                <option className="movements__box-options-filter-form-item-input-option" value="none">
                                                    None
                                                </option>
                                                <option className="movements__box-options-filter-form-item-input-option" value="income">
                                                    Income
                                                </option>
                                                <option className="movements__box-options-filter-form-item-input-option" value="expense">
                                                    Expense
                                                </option>
                                            </select>
                                        </div>

                                    </form>
                                    <form className="movements__box-options-filter-form" onChange={e => setActiveFilter(e.target.value)}>

                                        <div className="movements__box-options-filter-form-item">
                                            <span className="movements__box-options-filter-form-item-span">
                                                Filter by category
                                            </span>
                                            <select className="movements__box-options-filter-form-item-input input-select" defaultValue="None">
                                                <>
                                                    <option className="movements__box-options-filter-form-item-input-option" value="none">
                                                        None
                                                    </option>
                                                    {options.map((option, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                className="movements__box-options-filter-form-item-input-option"
                                                                value={option}
                                                            >
                                                                {option.charAt(0).toUpperCase() + option.toLowerCase().slice(1)}
                                                            </option>
                                                        )
                                                    })}
                                                </>
                                            </select>
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="movements__box-table-container">
                                <table className="movements__box-table">
                                    <thead className="movements__box-table-head">
                                        <tr className="movements__box-table-head-tr">
                                            <th className="movements__box-table-head-tr-th">
                                                Date
                                            </th>
                                            <th className="movements__box-table-head-tr-th">
                                                Concept
                                            </th>
                                            <th className="movements__box-table-head-tr-th">
                                                Type
                                            </th>
                                            <th className="movements__box-table-head-tr-th">
                                                Category
                                            </th>
                                            <th className="movements__box-table-head-tr-th">
                                                Amount
                                            </th>
                                            <th className="movements__box-table-head-tr-th">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="movements__box-table-body">
                                        {activeFilter === "none" && typeFilter === "none" &&
                                            budgets.map(budget => {
                                                return (
                                                    <MovementsTr
                                                        key={budget._id}
                                                        date={budget.bDate}
                                                        concept={budget.bConcept}
                                                        type={budget.bType}
                                                        category={budget.bCategory}
                                                        amount={budget.bAmount}
                                                        id={budget._id}
                                                        getData={getData}
                                                    />
                                                )
                                            })
                                        }
                                        {activeFilter !== "none" && typeFilter === "none" &&
                                            budgets.map(budget => {
                                                if (budget.bCategory === activeFilter)
                                                    return (
                                                        <MovementsTr
                                                            key={budget._id}
                                                            date={budget.bDate}
                                                            concept={budget.bConcept}
                                                            type={budget.bType}
                                                            category={budget.bCategory}
                                                            amount={budget.bAmount}
                                                            id={budget._id}
                                                            getData={getData}
                                                        />
                                                    )
                                            }
                                            )
                                        }
                                        {activeFilter === "none" && typeFilter !== "none" &&
                                            budgets.map(budget => {
                                                if (budget.bType === typeFilter)
                                                    return (
                                                        <MovementsTr
                                                            key={budget._id}
                                                            date={budget.bDate}
                                                            concept={budget.bConcept}
                                                            type={budget.bType}
                                                            category={budget.bCategory}
                                                            amount={budget.bAmount}
                                                            id={budget._id}
                                                            getData={getData}
                                                        />
                                                    )
                                            }
                                            )
                                        }
                                        {activeFilter !== "none" && typeFilter !== "none" &&
                                            budgets.map(budget => {
                                                if (budget.bType === typeFilter && budget.bCategory === activeFilter)
                                                    return (
                                                        <MovementsTr
                                                            key={budget._id}
                                                            date={budget.bDate}
                                                            concept={budget.bConcept}
                                                            type={budget.bType}
                                                            category={budget.bCategory}
                                                            amount={budget.bAmount}
                                                            id={budget._id}
                                                            getData={getData}
                                                        />
                                                    )
                                            }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {budgets === "no one" && options !== undefined &&
                        <div className="movements__noOne">
                            <h3 className="movements__noOne-h3">
                                You don't have any movement
                            </h3>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Movements;