import React, {useContext} from 'react';
import '../scss/App.scss';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../User-Auth/AuthContext';
import { FirebaseError } from 'firebase/app';
import {UserContext} from "../../App";

function LogInView() {

    // @ts-ignore
    const {state, dispatch} = useContext(UserContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { logIn } = useAuth()
    const navigate = useNavigate()

    if (!state && !loading) {
        console.log("Did not load correctly");
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function tryLogIn(event: React.SyntheticEvent) {
        event.preventDefault();
        logIn(email, password)
            .then(() => {
                setError("");
                setLoading(true);
                dispatch({type: "USER", payload: true})
                navigate("/dashboard");
                setLoading(false);
            })
            .catch((err: FirebaseError) => {
                console.log(err.code);
                return setError(err.code);
            })

    }

    /*
    function googleSignIn(event: React.SyntheticEvent): void {
        event.preventDefault();

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = (credential)? credential.accessToken : null;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            // ...
          });

    }*/

    return (

        <React.Fragment>
            <AuthProvider>
                <section className="section-01-log-in">
                    <div id="log-in-box">
                        <h1>Log In</h1>
                        <div className="error-message">
                            {error}
                        </div>
                        <h5>With your email</h5>
                        <div id="default-log-in">
                            <form onSubmit={tryLogIn}>
                                <input type="text" name="email" onChange={handleInputChange}
                                    value={email} placeholder="Enter email" />
                                <input type="password" name="password" onChange={handleInputChange}
                                    value={password} placeholder="Enter password" />
                                <input type="submit" value="Log In" id="log-in-submit" />
                            </form>
                        </div>

                    </div>



                <h5 className="line-break">
                    <span>Or</span>
                </h5>
                <Link to="/sign-up">
                    <button id="switch-to-sign-up">
                        Sign Up
                    </button>
                </Link>
                </section>
            </AuthProvider>

        </React.Fragment>



    );
}

export default LogInView;
