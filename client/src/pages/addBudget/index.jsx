import React from 'react';
import './style.scss'
import NavBar from './../../components/NavBar'
import AddNewForm from './../../components/addNewForm';
import axios from 'axios'

const AddNew = () => {

    const [dataUser, setDataUser] = React.useState();

    React.useState(async()=>{
        await axios.get(`http://localhost:4000/api/user/user=${localStorage.getItem("token")}`)
            .then(res=>setDataUser(res.data))
            .catch(err=>console.log(err))
    },[])

    return (
        <>
            <NavBar />
            <article className="addNewPage">
                <div className="addNewPage__container">
                    {dataUser !== undefined
                        ?
                        <AddNewForm uId={dataUser.id}/>
                        :
                        <div className="addNewPage__loading">
                            <div className="totalBudget__loading-circle"></div>
                        </div>
                    }
                </div>
            </article>
        </>
    )
}

export default AddNew