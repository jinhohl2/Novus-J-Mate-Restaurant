import React from "react";
import { Link } from "react-router-dom";

const FrontPage = (): JSX.Element => {
    return (
        <React.Fragment>
            <section className="section-11-front-page">
                <div id="front-page-background"></div>

                <div id="front-page-content">
                    <h1 id="front-page-title">Welcome to New Experiences!</h1>

                    <h3 id="slogan">Discover the world of hidden culinary gems with us!</h3>

                    <div id="front-page-signup-login">
                        <Link to="/sign-up">
                            <button id="front-page-signup">
                                <h2>Sign Up</h2>
                            </button>
                        </Link>

                        <Link to="/log-in">
                            <button id="front-page-login">
                                <h2>Log In</h2>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default FrontPage;
