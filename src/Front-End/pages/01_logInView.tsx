import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom"

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
        <div>
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
        </div>
    );
}

export default LogInView;
