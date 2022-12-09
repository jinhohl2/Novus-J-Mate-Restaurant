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

import { AuthProvider, useAuth } from '../../User-Auth/AuthContext';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
//const axios = require('axios');

function SignUpView() {
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "first-name": {
                setFirstName(value);
                break;
            }
            case "last-name": {
                setLastName(value);
                break;
            }
            case "email": {
                setEmail(value);
                break;
            }
            case "address": {
                setAddress(value);
                break;
            }
            case "password": {
                setPassword(value);
                break;
            }
            case "confirm-password": {
                setConfirmPassword(value);
                break;
            }
        }
    }

    function trySignUp(event: React.SyntheticEvent) {
        event.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match")
        }

        axios.post("http://localhost:4001/api" + `/users`,{
            "email" : email,
            "Fname" : firstName,
            "Lname" : lastName,
            "address" : [123,123],
            "placesVisited" : [],
            "reviews" : []
        })
        .then((res: AxiosResponse)=>{
            setError("");
            setLoading(true);
            var userId = res.data.data._id 
            signUp(email, password)
            .then(()=>{
                navigate("/dashboard");
                setLoading(false);
            })
            .catch((err: FirebaseError)=>{
                axios.delete("http://localhost:4001/api" + `/users/` + `${userId}`)
                console.log(err);
                return  setError("Failed to sign up");
            })
        })
        .catch((err: AxiosError)=>{
            var errMessage = JSON.parse(err.response?.request.response).message
            setLoading(false)
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
                                    <div>
                                        <input type="text" name="first-name" onChange={handleInputChange}
                                            value={firstName} placeholder="Enter first name" />
                                        <input type="text" name="last-name" onChange={handleInputChange}
                                            value={lastName} placeholder="Enter last name" />
                                    </div>
                                    <div>
                                    <input type="text" name="email" onChange={handleInputChange}
                                        value={email} placeholder="Enter email" />
                                    <input type="text" name="address" onChange={handleInputChange}
                                        value={address} placeholder="Enter address" />
                                    </div>
                                    <div id="password-row">
                                        <input type="password" name="password" onChange={handleInputChange}
                                            value={password} placeholder="Enter password" />
                                        <input type="password" name="confirm-password" onChange={handleInputChange}
                                            value={confirmPassword} placeholder="Confirm password" />
                                    </div>
                                    <h6>Use 7-27 characters with at least one letter and one number. </h6>
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
