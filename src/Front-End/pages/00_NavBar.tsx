import React from 'react';
import '../scss/App.scss';
import {Link} from "react-router-dom";


const NavBar = () => {
    return (
        <React.Fragment>
            <nav>
                <div className="div-nav-menu-items">
                    <ul>

                        <li className="menu-item-sign-up">
                            <Link to="/sign-up">Sign-Up</Link>
                        </li>

                        <li className="menu-item-log-in">
                            <Link to="/log-in">Log-In</Link>
                        </li>

                        <li className="menu-item-user-profile">
                            <Link to="/user-profile">User Profile</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;