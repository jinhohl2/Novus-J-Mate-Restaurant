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

                        <li className="menu-item-dashboard">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>

                        <li className="menu-item-main-search-criteria">
                            <Link to="/main-search-criteria">Main-Search-Criteria</Link>
                        </li>

                        <li className="menu-item-restaurant-results">
                            <Link to="/restaurant-results">Restaurant-Results</Link>
                        </li>

                        <li className="menu-item-restaurant-details">
                            <Link to="/restaurant-details">Restaurant-Details</Link>
                        </li>

                        <li className="menu-item-find-friends">
                            <Link to="/find-friends">Find-Friends</Link>
                        </li>

                        <li className="menu-item-profile-of-friends">
                            <Link to="/profile-of-friends">Profile-of-Friends</Link>
                        </li>

                        <li className="menu-item-analytics">
                            <Link to="/analytics">Analytics</Link>
                        </li>


                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;