import React from 'react';
import '../scss/App.scss';
import {Link} from "react-router-dom";
import { useState, ChangeEvent } from "react";

function SignUpView() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    function trySignUp(event: React.SyntheticEvent): void {
        console.log(`tried to sign up in with email: ${email} and password: ${password}.`);
    }

    return (

        <React.Fragment>

            <section className="section-02-sign-up">
                <div id="sign-up-box">
                    <div id="default-sign-up">
                        <form onSubmit={trySignUp}>
                            <input type="text" name="email" onChange={handleInputChange} value={email}/>
                            <input type="text" name="password" onChange={handleInputChange} value={password}/>
                            <input type="text" name="confirm-password" onChange={handleInputChange} value={confirmPassword}/>
                            <input type="submit"/>
                        </form>
                    </div>
                    <div id="provider-sign-up">

                    </div>
                </div>
            </section>

        </React.Fragment>
    );
}

export default SignUpView;
