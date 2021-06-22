import React from 'react'
import axios from 'axios';
import EditBudget from '../../components/editBudget';

const MovementsTr = ({ date, concept, type, category, amount, id, getData }) => {

    const [editActive, setEditActive] = React.useState(false);

    const deleteBudget = () => {
        if (window.confirm('Are you sure?')) {
            axios.post(`http://localhost:4000/api/budget/budgetDelete=${id}`, { uId: localStorage.getItem("token") })
                .then(() => getData())
                .catch(err => console.log(err))
        }
    }

    const closeEdit = () =>  setEditActive(false);

    return (
        <>
            <tr className="movements__box-table-body-tr">
                <th className="movements__box-table-body-tr-th">
                    {date}
                </th>
                <th className="movements__box-table-body-tr-th">
                    {concept}
                </th>
                <th className="movements__box-table-body-tr-th">
                    {type}
                </th>
                <th className="movements__box-table-body-tr-th">
                    {category}
                </th>
                <th className="movements__box-table-body-tr-th">
                    ${amount}
                </th>
                <th className="movements__box-table-body-tr-th th-icon">
                    <span className="movements__box-table-body-tr-th-span">
                        <i
                            className="movements__box-table-body-tr-th-span-i edit-btn fas fa-edit"
                            onClick={() => setEditActive(true)}
                        >
                        </i>
                    </span>
                    <span className="movements__box-table-body-tr-th-span">
                        <i
                            className="movements__box-table-body-tr-th-span-i del-btn fas fa-trash"
                            onClick={deleteBudget}
                        >
                        </i>
                    </span>
                </th>
            </tr>
            {editActive &&
                <EditBudget
                    oDate={date}
                    oConcept={concept}
                    oType={type}
                    oCategory={category}
                    oAmount={amount}
                    id={id}
                    closeEdit={closeEdit}
                    getData={getData}
                />
            }


        </>
    )
}

export default MovementsTr;
