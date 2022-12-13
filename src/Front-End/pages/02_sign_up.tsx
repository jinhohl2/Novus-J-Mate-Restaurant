import React, {useContext} from 'react';
import '../scss/App.scss';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AuthProvider, useAuth } from '../../User-Auth/AuthContext';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { FirebaseError } from 'firebase/app';
import {UserContext} from "../../App";


function SignUpView() {

    // @ts-ignore
    const {state, dispatch} = useContext(UserContext);

    const [email, setEmail] = useState<string>("");
    const [lng, setLng] = useState<string>("");
    const [lat, setLat] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    if (!state) {
        console.log("Does not have a state");
    }

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
            case "Latitude": {
                setLat(value);
                break;
            }
            case "Longitude": {
                setLng(value);
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

        var latitude = Number(lat)
        var longitude = Number(lng)
        axios.post("http://localhost:4001/api/users", {
            "email": email,
            "Fname": firstName,
            "Lname": lastName,
            "address": [latitude, longitude],
            "placesVisited": [],
            "reviews": []
        })
            .then((res: AxiosResponse) => {
                setError("");
                setLoading(true);
                var userId = res.data.data._id
                signUp(email, password)
                    .then(() => {
                        dispatch({type: "USER", payload: true})
                        navigate("/dashboard");
                        setLoading(false);
                    })
                    .catch((err: FirebaseError) => {
                        axios.delete(`http://localhost:4001/api/users/${userId}`)
                        console.log(err);
                        return setError("Failed to sign up");
                    })
            })
            .catch((err: AxiosError) => {
                var errMessage = JSON.parse(err.response?.request.response).message
                setLoading(false)
                return setError(errMessage);
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
                        <div className="error-message">
                            {error}
                        </div>
                        <h5>With your email</h5>
                        <div id="default-sign-up">
                            <fieldset disabled={loading}>
                                <form onSubmit={trySignUp}>
                                    <div id="first-row">
                                        <input type="text" name="first-name" onChange={handleInputChange}
                                            value={firstName} placeholder="Enter first name" />
                                        <input type="text" name="last-name" onChange={handleInputChange}
                                            value={lastName} placeholder="Enter last name" />
                                    </div>
                                    <div id="middle-row">
                                        <input id="email-part" type="text" name="email" onChange={handleInputChange}
                                            value={email} placeholder="Enter email" />
                                        <div>
                                            <input id="lat" type="text" name="Latitude" onChange={handleInputChange}
                                                value={lat} placeholder="Enter Latitude" />
                                            <input id="lng" type="text" name="Longitude" onChange={handleInputChange}
                                                value={lng} placeholder="Enter Longitude" />
                                        </div>
                                    </div>
                                    <div id="password-row">
                                        <input type="password" name="password" onChange={handleInputChange}
                                            value={password} placeholder="Enter password" />
                                        <input type="password" name="confirm-password" onChange={handleInputChange}
                                            value={confirmPassword} placeholder="Confirm password" />
                                    </div>
                                    <input type="submit" value="Create Account" id="sign-up-submit"/>
                                </form>
                            </fieldset>
                        </div>

                    </div>


                    <h5 className="line-break">
                        <span>Or</span>
                    </h5>
                    <Link to="/log-in">
                        <button id="switch-to-log-in">
                            Log In
                        </button>
                    </Link>
                </section>
            </AuthProvider>
        </React.Fragment>
    );
}

export default SignUpView;
