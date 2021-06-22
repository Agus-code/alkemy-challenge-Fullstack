import React from 'react';
import './style.scss'
import axios from 'axios';


const LastTen = () => {

    const [budgetsData, setBudgetsData] = React.useState();

    const getData = async () => {
        await axios.get(`http://localhost:4000/api/budget/latest=${localStorage.getItem("token")}`)
            .then(res => setBudgetsData(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getData();
    }, [])

    return (
        <article className="lastTen">
            <div className="lastTen__container">
                {budgetsData !== undefined
                    ?
                    budgetsData.info !== "no budgets"
                        ?
                        <>
                            <div className="lastTen__title">
                                <h3 className="lastTen__title-h3">
                                    Your last ten movements:
                                </h3>
                            </div>
                            <div className="lastTen__movements">

                                <table className="lastTen__movements-table">
                                    <thead className="lastTen__movements-table-head">
                                        <tr className="lastTen__movements-table-head-tr">
                                            <th className="lastTen__movements-table-head-tr-th">
                                                Date
                                            </th>
                                            <th className="lastTen__movements-table-head-tr-th">
                                                Concept
                                            </th>
                                            <th className="lastTen__movements-table-head-tr-th">
                                                Type
                                            </th>
                                            <th className="lastTen__movements-table-head-tr-th">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="lastTen__movements-table-body">
                                        {budgetsData.map(budget => {
                                            return (
                                                <>
                                                    <tr className="lastTen__movements-table-body-tr" key={budget._id} >
                                                        <th className="lastTen__movements-table-body-tr-th">
                                                            {budget.bDate}
                                                        </th>
                                                        <th className="lastTen__movements-table-body-tr-th">
                                                            {budget.bConcept}
                                                        </th>
                                                        <th className="lastTen__movements-table-body-tr-th">
                                                            {budget.bType}
                                                        </th>
                                                        <th className="lastTen__movements-table-body-tr-th">
                                                            ${budget.bAmount}
                                                        </th>
                                                    </tr>
                                                </>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </>
                        :
                        <div className="lastTen__movements-noOne">
                            <h4 className="lastTen__movements-noOne-h4">
                                Add a income or a expense to see it
                            </h4>
                        </div>
                    :
                    <div className="lastTen__loading">
                        <div className="totalBudget__loading-circle"></div>
                    </div>
                }
            </div>
        </article>
    )
}

export default LastTen;
