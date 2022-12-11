import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../User-Auth/AuthContext';

const Dashboard = () => {
    // const { currentUser } = useAuth();

    let buttons: JSX.Element;

    // If first time in the day, return Filtering and Surprise Me buttons
    // Otherwise, reutrn Today's Results button
    if (true) {
        buttons = (
            <div id='daily-choice'>
                <Link to={"/main-search-criteria"}>
                    <button>
                        <h1>Give me filtering criteria</h1>
                        <h4>then generate restaurants</h4>
                    </button>
                </Link>
                <Link to={{ pathname: "/restaurant-results" }}
                    state={{ surprise_me: true }}>
                    <button>
                        <h1>Surprise me</h1>
                        <h4>with new experiences</h4>
                    </button>
                </Link>
            </div>
        );
    } else {
        buttons = (
            <div id='todays-results'>
                <Link to={"/restaurant-results"}>
                    <button>
                        <h1>Today's Results</h1>
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            <section className="section-04-dashboard">
                {/* <h1>welcome! {currentUser.email}</h1> */}
                {buttons}
            </section>
        </React.Fragment>
    );
};

export default Dashboard;
