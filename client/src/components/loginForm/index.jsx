import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import axios from 'axios'

const LoginForm = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [seePassword, setSeePassword] = React.useState(false);

    const history = useHistory();

    const handleLogIn = async (e) => {
        e.preventDefault();

        if (email.length < 1 || password.length < 1) return;

        

        const data = {
            email,
            password
        }

        await axios.post("http://localhost:4000/api/user/signin", data)
            .then(res => localStorage.setItem("token", res.data.token))
            .then(()=>history.push("/"))
            .catch(err => console.log(err))
    }

    return (
        <article className="loginForm">
            <div className="loginForm__container">
                <header className="loginForm__header">
                    <div className="loginForm__header-title">
                        <h2 className="loginForm__header-title-h2">
                            Log In
                        </h2>
                    </div>
                </header>
                <form className="loginForm__form" onSubmit={handleLogIn}>
                    <div className="loginForm__form-container">
                        <div className="loginForm__form-item">
                            <input
                                type="text"
                                placeholder="Email..."
                                className="loginForm__form-item-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginForm__form-item">
                            <input
                                type={seePassword ? 'text' : 'password'}
                                placeholder="Password..."
                                className="loginForm__form-item-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {seePassword
                                ?
                                <i className="loginForm__form-item-i fas fa-eye-slash" onClick={() => setSeePassword(false)}></i>
                                :
                                <i className="loginForm__form-item-i fas fa-eye" onClick={() => setSeePassword(true)}></i>
                            }
                        </div>
                        <div className="loginForm__form-submit">
                            <button className={
                                `loginForm__form-submit-btn ${email.length > 0 && password.length > 0 ? "active" : ""}`}
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
                <footer className="loginForm__footer">
                    <div className="loginForm__footer-item">
                        <p className="loginForm__footer-item-p">
                            Don't have an account? <Link to='/signup' className="loginForm__footer-item-p-link">Sign Up</Link>
                        </p>
                    </div>
                </footer>
            </div>
        </article>
    )
}

export default LoginForm;