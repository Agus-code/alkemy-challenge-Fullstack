import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import login_img from './../../Assets/login_img.svg'
import LoginForm from './../../components/loginForm'
import AuthContext from './../../provider/AuthProvider'

const LogIn = () => {

    const { isLogged, getLogged } = React.useContext(AuthContext);

    const history = useHistory();

    React.useEffect(()=>{
        getLogged();
    })

    React.useEffect(()=>{
        if(isLogged) return history.push("/");
    })

    return(
        <div className="loginPage">
            <div className="loginPage__container">
                <div className="loginPage__image">
                    <div className="loginPage__image-container">
                        <img 
                            src={login_img}
                            alt="login finance"
                            className="loginPage__image-container-img"
                        />
                    </div>
                </div>
                <div className="loginPage__formSide">
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default LogIn;