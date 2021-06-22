import React from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom'


const Navbar = () => {

    const [menuOpen, setMenuOpen] = React.useState(false)

    const history = useHistory();

    const handleLogOut = () => {
        history.push("/");
        return localStorage.removeItem("token");
    }

    return (
        <nav className="mainNav">
            <div className="mainNav__container">
                <div className="mainNav__menu">
                    <div className="mainNav__menu-btn">
                        <i className="fas fa-bars" onClick={() => setMenuOpen(!menuOpen)}></i>
                    </div>

                    <ul className={`mainNav__menu-ul ${menuOpen ? "active" : ""}`}>
                        <div className="mainNav__menu-ul-backward" onClick={()=>setMenuOpen(false)}></div>
                        <li className="mainNav__menu-ul-item">
                            <Link to="/" className="mainNav__menu-ul-item-link">
                                HOME
                            </Link>
                        </li>
                        <li className="mainNav__menu-ul-item">
                            <Link to="/movements" className="mainNav__menu-ul-item-link">
                                MOVEMENTS
                            </Link>
                        </li>
                        <li className="mainNav__menu-ul-item">
                            <span className="mainNav__menu-ul-item-link" onClick={()=>handleLogOut()}>
                                LOG OUT
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
