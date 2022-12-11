import React from "react";
import { Link } from "react-router-dom";

const FrontPage = (): JSX.Element => {
    return (
        <React.Fragment>
            <section className="section-11-front-page">
                <h1>Welcome to New Experiences!</h1>
                <div id="front-page-signup-login">
                    <Link to="/sign-up">
                        <button>
                            <h2>Sign Up</h2>
                        </button>
                    </Link>
                    <Link to="/log-in">
                        <button>
                            <h2>Log In</h2>
                        </button>
                    </Link>
                </div>
            </section>
        </React.Fragment>
    );
};

export default FrontPage;
