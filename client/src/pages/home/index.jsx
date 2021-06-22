import React from 'react';
import { useHistory } from 'react-router-dom'
import './style.scss';
import AuthContext from '../../provider/AuthProvider';
import Navbar from './../../components/NavBar'
import TotalBudget from '../../components/totalBudget';
import LastTen from '../../components/lastTen';
import axios from 'axios';

const Home = () => {

    const [dataUser, setDataUser] = React.useState();
    const { isLogged, getLogged } = React.useContext(AuthContext);

    const history = useHistory();

    const getData = async () => {
        await axios.get(`http://localhost:4000/api/user/user=${localStorage.getItem("token")}`)
            .then(res => setDataUser(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        getLogged();
    })

    React.useEffect(() => {
        if (isLogged === false) return history.push("/login");
    })

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Navbar />

            {
                dataUser
                    ?
                    <div className="homePage">
                        <div className="homePage__container">
                            <TotalBudget usename={dataUser.username} />
                            <LastTen />
                        </div>
                    </div>
                    :
                    <div>
                        Cargando
                    </div>
            }
        </>
    )
}

export default Home;

