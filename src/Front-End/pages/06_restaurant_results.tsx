import React from 'react';

// TODO: Change props to contain search parameters.
const RestaurantResults = () => {
    function unvisitedText(rest_name: string, rest_img: string): JSX.Element {
        return (
            <div>
                <img src={`${process.env.PUBLIC_URL}${rest_img}`} alt={rest_name} />
                <h3>{rest_name}</h3>
            </div>
        );
    }

    function getResults() {
        // placeholder
        const restaurant_names = ["restaurant1", "restaurant2", "restaurant3"];
        const restaurant_imgs = ["../assets/logo.svg", "../logo192.png", "../logo512.png"];

        // TODO: change condition to check if the user has been to any restaurants matching their search parameters.
        if (true) {
            return (
                <div>
                    <div id="visited-restaurant-recommendation-block">
                        <h2>Visited</h2>
                        <h5>Revisit a place you know and love!</h5>
                        <img src={`${process.env.PUBLIC_URL}${restaurant_imgs[0]}`} alt={restaurant_names[0]} />
                        <h3>{restaurant_names[0]}</h3>
                    </div>

                    <div id="not-visited-restaurant-recommendation-block">
                        <h2>Unexplored</h2>
                        <h5>Expand the horizons of your palette!</h5>
                        <div>
                            {unvisitedText(restaurant_names[1], restaurant_imgs[1])}
                            {unvisitedText(restaurant_names[2], restaurant_imgs[2])}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div id="only-not-visited-restaurant-recommendation-block">
                        <h2>Unexplored</h2>
                        <h5>Expand the horizons of your palette!</h5>
                        <div>
                            {unvisitedText(restaurant_names[0], restaurant_imgs[0])}
                            {unvisitedText(restaurant_names[1], restaurant_imgs[1])}
                            {unvisitedText(restaurant_names[2], restaurant_imgs[2])}
                        </div>
                    </div>
                </div>
            );
        }
    }
    return (
        <React.Fragment>
            <section className="section-06-restaurant-results">
                <h1>Results</h1>
                <div id="restaurant-results-container">
                    {getResults()}
                </div>
            </section>
        </React.Fragment>
    );
};

export default RestaurantResults;
