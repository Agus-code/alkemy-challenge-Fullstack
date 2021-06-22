import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import axios from 'axios'

const SignupForm = () => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [seePassword, setSeePassword] = React.useState(false);
    //const [loading, setLoading] = React.useState(false)
    //const [msg, setMsg] = React.useState('');

    const history = useHistory();

    const handleSignUp = async(e) => {
        e.preventDefault();

        if (username.length < 1 || email.length < 1 || password.length < 1) {
            return
        }

        const data = {
            username,
            email,
            password
        }

        await axios.post('http://localhost:4000/api/user/signup',data)
            .then(()=>history.push("/login"))
            .catch(err=>console.log(err))

        
    }


    return (
        <article className="signupForm">
            <div className="signupForm__container">
                <header className="signupForm__header">
                    <div className="signupForm__header-title">
                        <h2 className="signupForm__header-title-h2">
                            Sign Up
                        </h2>
                    </div>
                </header>
                <form className="signupForm__form" onSubmit={handleSignUp}>
                    <div className="signupForm__form-container">
                        <div className="signupForm__form-item">
                            <input
                                type="text"
                                placeholder="Username..."
                                className="signupForm__form-item-input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="signupForm__form-item">
                            <input
                                type="text"
                                placeholder="Email..."
                                className="signupForm__form-item-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signupForm__form-item">
                            <input
                                type={seePassword ? 'text' : 'password'}
                                placeholder="Password..."
                                className="signupForm__form-item-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {seePassword
                                ?
                                <i className="signupForm__form-item-i fas fa-eye-slash" onClick={() => setSeePassword(false)}></i>
                                :
                                <i className="signupForm__form-item-i fas fa-eye" onClick={() => setSeePassword(true)}></i>
                            }
                        </div>
                        <div className="signupForm__form-submit">
                            <button className={
                                `signupForm__form-submit-btn ${username.length > 0 && email.length > 0 && password.length > 0 ? "active" : ""}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
                <footer className="signupForm__footer">
                    <div className="signupForm__footer-item">
                        <p className="signupForm__footer-item-p">
                            Have an account? <Link to='/login' className="signupForm__footer-item-p-link">Log In</Link>
                        </p>
                    </div>
                </footer>
            </div>
        </article>
    )
}

export default SignupForm;