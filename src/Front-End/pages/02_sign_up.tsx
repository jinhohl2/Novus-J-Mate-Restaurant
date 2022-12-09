import React from 'react';
import '../scss/App.scss';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrosoft,
    faGoogle,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthContext'
import axios, {} from 'axios'
import { FirebaseError } from 'firebase/app';
//const axios = require('axios');
 
function SignUpView() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp } = useAuth()
    const navigate = useNavigate()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirm-password") {
            setConfirmPassword(value);
        }
    }

    function trySignUp(event: React.SyntheticEvent) {
        event.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match")
        }

        axios.post("http://localhost:4001/api" + `/users`,{
            "email" : email,
            "Fname" : "inputBy",
            "Lname" : "signIn",
            "address" : [123,123],
            "placesVisited" : [],
            "reviews" : []
        })
        .then((res)=>{
            setError("")
            setLoading(true)
            console.log("here")
            console.log(res);
            signUp(email, password)
            .then(()=>{
                navigate("/dashboard");
                setLoading(false)
            })
            .catch((err : FirebaseError)=>{
                console.log(err)
                return  setError("Failed to sign up");
            })
        })
        .catch((err)=>{
            var errMessage = JSON.parse(err.response.request.response).message
            return  setError(errMessage);
        })
    }

    /*
    function googleSignUp(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log("here")
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
                <section className="section-02-sign-up">
                    <div id="sign-up-box">
                        <h1>Sign Up</h1>
                        <div className = "error-message">
                            {error}
                        </div>  
                        <h5>With your email</h5>
                        <div id="default-sign-up">
                            <fieldset disabled={loading}>
                                <form onSubmit={trySignUp}>
                                    <input type="text" name="email" onChange={handleInputChange}
                                        value={email} placeholder="Enter email" />
                                    <input type="text" name="password" onChange={handleInputChange}
                                        value={password} placeholder="Enter password" />
                                    <h6>Use 7-27 characters with at least one letter and number.</h6>
                                    <input type="text" name="confirm-password" onChange={handleInputChange}
                                        value={confirmPassword} placeholder="Confirm password" />
                                    <input type="submit" value="Create Account" id="sign-up-submit" />
                                </form>
                            </fieldset>
                        </div>

                        <h5>Or with a provider</h5>

                        <div id="provider-sign-up">
                            <button id="microsoft-sign-up" >
                                <FontAwesomeIcon icon={faMicrosoft} /> Microsoft
                            </button>
                            <button id="google-sign-up">
                                <FontAwesomeIcon icon={faGoogle} /> Google
                            </button>
                            <button id="facebook-sign-up">
                                <FontAwesomeIcon icon={faFacebook} /> Facebook
                            </button>
                        </div>
                    </div>

                    <h5 className="line-break">
                        <span>Or</span>
                    </h5>
                    <button id="switch-to-log-in">
                        <Link to="/log-in">Log In</Link>
                    </button>
                </section>
            </AuthProvider>
        </React.Fragment>
    );
}

export default SignUpView;
