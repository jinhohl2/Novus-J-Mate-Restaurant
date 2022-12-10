import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../User-Auth/AuthContext';
const Dashboard = () => {
    const { currentUser } = useAuth()

    return (
        <React.Fragment>
            <section className="section-04-dashboard">
                <h1>Welcome, {currentUser.email}!</h1>
                <div id='daily-choice'>
                    <Link to={"/main-search-criteria"}>
                        <button>
                            <h2>Give me filtering criteria</h2>
                            <h4>then generate restaurants</h4>
                        </button>
                    </Link>
                    <Link to={{pathname: "/restaurant-results"}} state={{surprise_me: true}} >
                        <button>
                            <h2>Surprise me</h2>
                            <h4>with new experiences</h4>
                        </button>
                    </Link>
                </div>

                <div id='todays-results'>
                    <button>
                        <h2>Today's Results</h2>
                    </button>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Dashboard;
