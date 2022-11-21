import React from 'react';
import '../scss/App.scss';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrosoft,
    faGoogle,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function LogInView() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function tryLogIn(event: React.SyntheticEvent): void {
        console.log(`tried to log in with email: ${email} and password: ${password}.`);
    }

    return (

        <React.Fragment>

            <section className="section-01-log-in">
                <div id="log-in-box">
                    <h1>Log In</h1>
                    <h5>With your email</h5>
                    <div id="default-log-in">
                        <form onSubmit={tryLogIn}>
                            <input type="text" name="email" onChange={handleInputChange}
                                value={email} placeholder="Enter email" />
                            <input type="text" name="password" onChange={handleInputChange}
                                value={password} placeholder="Enter password" />
                            <input type="submit" value="Log In" id="log-in-submit" />
                        </form>
                    </div>

                    <h5>Or with a provider</h5>
                    <div id="provider-log-in">
                        <button id="microsoft-log-in">
                            <FontAwesomeIcon icon={faMicrosoft} /> Microsoft
                        </button>
                        <button id="google-log-in">
                            <FontAwesomeIcon icon={faGoogle} /> Google
                        </button>
                        <button id="facebook-log-in">
                            <FontAwesomeIcon icon={faFacebook} /> Facebook
                        </button>
                    </div>
                </div>

                <h5 className="line-break">
                    <span>Or</span>
                </h5>
                <button id="switch-to-sign-up">
                    <Link to="/sign-up">Sign Up</Link>
                </button>
            </section>

        </React.Fragment>



    );
}

export default LogInView;
