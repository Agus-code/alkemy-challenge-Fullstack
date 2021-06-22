import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TotalBudget = ({ usename }) => {

    const [totalSalary, setTotalSalary] = React.useState(undefined);

    const getData = async () => {
        await axios.get(`http://localhost:4000/api/budget/total=${localStorage.getItem("token")}`)
            .then(res => setTotalSalary(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <article className="totalBudget">
                {totalSalary !== undefined
                    ?
                    <div className="totalBudget__container">
                        <div className="totalBudget__username">
                            <h3 className="totalBudget__username-h3">
                                Welcome {usename}
                            </h3>
                        </div>
                        <div className="totalBudget__balance">
                            <h4 className="totalBudget__balance-h4">
                                Your total budget is
                            </h4>
                            <div className={`totalBudget__balance-value ${totalSalary > 0 ? "high" : ""} ${totalSalary < 0 ? "low" : ""}`}>
                                $
                                <span className="totalBudget__balance-value-number">
                                    {totalSalary}
                                </span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="totalBudget__loading">
                        <div className="totalBudget__loading-circle"></div>
                    </div>
                }

                <div className="totalBudget__add">
                    <Link to="/budget/new" className="totalBudget__add-link">
                        ADD NEW
                    </Link>
                </div>
            </article>
        </>
    )
}

export default TotalBudget;