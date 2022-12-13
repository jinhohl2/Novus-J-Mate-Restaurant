import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../User-Auth/AuthContext';
import { User } from '../../App';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const email = currentUser.email;
    let [firstTimeIn24Hrs, setFirstTimeIn24Hrs] = useState(true);

    const api = axios.create({
        baseURL: "http://localhost:4001/api/"
    });

    useEffect(() => {
        api.get("users").then((response) => {
            if (response.data) {
                console.log(response.data.data);
                let user = response.data.data.filter((user: User) => user.email === email)[0];
                let mostRecentDate = new Date(0); console.log(user);
                if (user?.lastClick) {
                    if (user.lastClick > mostRecentDate) {
                        mostRecentDate = user.lastClick;
                    }
                }

                let currDate = new Date();
                currDate.setHours(0, 0, 0, 0);
                mostRecentDate.setHours(0, 0, 0, 0);
                console.log(`currDate: ${currDate}, mostRecentDate: ${mostRecentDate}`);
                setFirstTimeIn24Hrs(currDate > mostRecentDate);
            }
        });
    }, []);

    let buttons: JSX.Element;

    // If first time in the day, return Filtering and Surprise Me buttons
    // Otherwise, return Today's Results button
    if (firstTimeIn24Hrs) {
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
                <h1>Welcome, {currentUser.email}!</h1>
                {buttons}
            </section>
        </React.Fragment>
    );
};

export default Dashboard;
