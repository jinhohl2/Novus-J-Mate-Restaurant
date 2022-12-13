import React, {useContext} from 'react';
import '../scss/App.scss';
import {Link} from "react-router-dom";
import {useAuth} from '../../User-Auth/AuthContext';
import {useState} from 'react'
import {useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {UserContext} from "../../App";





const NavBar = () => {

    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState<String>("");
    const navigate = useNavigate();
    if (!currentUser && error) {
        console.log("currentUser does not exist");
    }

    // @ts-ignore
    const {state, dispatch} = useContext(UserContext);

    const RenderMenu = () => {
        if (state) {
            return(
                <React.Fragment>

                        <li className="menu-item-home-button">
                            <Link to="/">
                                Home
                            </Link>
                        </li>

                        <li className="menu-item-user-profile">
                            <Link to="/user-profile">User Profile</Link>
                        </li>

                        <li className="menu-item-dashboard">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>

                        <li className="menu-item-analytics">
                            <Link to="/analytics">Analytics</Link>
                        </li>

                        <li className="menu-item-logout" onClick = {tryLogOut}>
                            <button className="menu-item-logout">
                                Logout
                            </button>

                        </li>
                </React.Fragment>
            )
        } else {
            return(
                <React.Fragment>

                        <li className="menu-item-sign-up">
                            <Link to="/sign-up">
                                <button>
                                    Sign-Up
                                </button>
                            </Link>
                        </li>

                        <li className="menu-item-log-in">
                            <Link to="/log-in">
                                <button>
                                    Log-In
                                </button>
                            </Link>
                        </li>
                </React.Fragment>
            )
        }
    }

    function tryLogOut(event: React.SyntheticEvent) {
        event.preventDefault();
        logOut()
            .then(() => {
                setError("");
                dispatch({type: "USER", payload: false})
                navigate("/log-in");
            })
            .catch((err: FirebaseError) => {
                console.log(err.code);
                return setError(err.code);
            })

    }



    return (
        <React.Fragment>
            <nav>
                <div className="div-nav-menu-items">
                    <ul>

                        <RenderMenu />

                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;
