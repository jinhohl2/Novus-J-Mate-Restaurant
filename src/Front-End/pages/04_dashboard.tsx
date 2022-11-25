import React from 'react';

const Dashboard = () => {
    return (
        <React.Fragment>
            <section className="section-04-dashboard">
                <div id='daily-choice'>
                    <button>
                        <h2>Give me filtering criteria</h2>
                        <h4>then generate restaurants</h4>
                    </button>
                    <button>
                        <h2>Surprise me</h2>
                        <h4>with new experiences</h4>
                    </button>
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