import React from 'react';
import '../scss/App.scss';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrosoft,
    faGoogle,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import auth from './firebase.js'
import { FirebaseError } from 'firebase/app';
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider , FacebookAuthProvider } from 'firebase/auth'

 
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
        } else if (name === "confirm-password") {
            setConfirmPassword(value);
        }
    }

    function trySignUp(event: React.SyntheticEvent): void {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("The passwords do not match");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert('User registered successfully!')
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch((err: FirebaseError)=>{
                if (err.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                  }
              
                  if (err.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                  }
            }) 
        }
    }

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

    }

    return (

        <React.Fragment>

            <section className="section-02-sign-up">
                <div id="sign-up-box">
                    <h1>Sign Up</h1>
                    <h5>With your email</h5>
                    <div id="default-sign-up">
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
                    </div>

                    <h5>Or with a provider</h5>

                    <div id="provider-sign-up">
                        <button id="microsoft-sign-up" >
                            <FontAwesomeIcon icon={faMicrosoft} /> Microsoft
                        </button>
                        <button id="google-sign-up">
                            <FontAwesomeIcon icon={faGoogle} onClick = {googleSignUp}/> Google
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

        </React.Fragment>
    );
}

export default SignUpView;
