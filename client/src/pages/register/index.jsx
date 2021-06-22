import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import register_img from './../../Assets/register_img.svg'
import SignupForm from './../../components/registerForm'
import AuthContext from './../../provider/AuthProvider'

const SignUp = () => {

    const { isLogged, getLogged } = React.useContext(AuthContext);

    const history = useHistory();

    React.useEffect(()=>{
        getLogged();
    })

    React.useEffect(()=>{
        if(isLogged) return history.push("/");
    })

    return(
        <div className="signupPage">
            <div className="signupPage__container">
                <div className="signupPage__image">
                    <div className="signupPage__image-container">
                        <img 
                            src={register_img}
                            alt="register finance"
                            className="signupPage__image-container-img"
                        />
                    </div>
                </div>
                <div className="signupPage__formSide">
                    <SignupForm/>
                </div>
            </div>
        </div>
    )
}

export default SignUp;