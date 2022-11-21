import React from 'react';
import { useState } from "react";

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
                <div id="login-in-box">
                    <div id="default-log-in">
                        <form onSubmit={tryLogIn}>
                            <input type="text" name="email" onChange={handleInputChange} value={email}/>
                            <input type="text" name="password" onChange={handleInputChange} value={password}/>
                            <input type="submit"/>
                        </form>
                    </div>
                    <div id="provider-log-in">

                    </div>
                </div>
            </section>

        </React.Fragment>



    );
}

export default LogInView;
