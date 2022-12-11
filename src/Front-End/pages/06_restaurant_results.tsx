import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';

interface RestaurantResult {
    name: string,
    img_src: string
}

const RestaurantResults = () => {
    const [resultsString, setResultsString]
        = useLocalStorage('results', JSON.stringify([{ name: "restaurant1", img_src: "../assets/logo.svg" },
        { name: "restaurant2", img_src: "../assets/logo.svg" },
        { name: "restaurant3", img_src: "../assets/logo.svg" }]));
    const resultsJSON = getStoredResults();
    const location = useLocation();

    function getStoredResults() {
        return JSON.parse(resultsString);
    }

    function buildResults(restaurant_names: string[], img_srcs: string[]) {
        const newResults = [{ name: restaurant_names[0], img_src: img_srcs[0] },
        { name: restaurant_names[1], img_src: img_srcs[1] },
        { name: restaurant_names[2], img_src: img_srcs[2] }]
        setResultsString(JSON.stringify(newResults));
    }

    function unvisitedText(rest_name: string, rest_img: string): JSX.Element {
        return (
            <div>
                <img src={`${process.env.PUBLIC_URL}${rest_img}`} alt={rest_name} />
                <h3>{rest_name}</h3>
            </div>
        );
    }

    function getVisitedUnvisitedResults() {
        // TODO: change condition to check if the user has been to any restaurants matching their search parameters.
        if (true) {
            return (
                <div>
                    <div>
                        <div id="visited-restaurant-recommendation-block">
                            <h2>Visited</h2>
                            <h5>Revisit a place you know and love!</h5>
                            <Link to={"/restaurant-results/1"}>
                                <img src={`${process.env.PUBLIC_URL}${resultsJSON[0].img_src}`} alt={resultsJSON[0].name} />
                                <h3>{resultsJSON[0].name}</h3>
                            </Link>
                        </div>

                        <div id="not-visited-restaurant-recommendation-block">
                            <h2>Unexplored</h2>
                            <h5>Expand the horizons of your palette!</h5>
                            <div>
                                <Link to={"/restaurant-results/2"}>
                                    {unvisitedText(resultsJSON[1].name, resultsJSON[1].img_src)}
                                </Link>
                                <Link to={"/restaurant-results/3"}>
                                    {unvisitedText(resultsJSON[2].name, resultsJSON[2].img_src)}
                                </Link>
                            </div>
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
                            <Link to={"/restaurant-results/1"}>
                                {unvisitedText(resultsJSON[0].name, resultsJSON[0].img_src)}
                            </Link>
                            <Link to={"/restaurant-results/2"}>
                                {unvisitedText(resultsJSON[1].name, resultsJSON[1].img_src)}
                            </Link>
                            <Link to={"/restaurant-results/3"}>
                                {unvisitedText(resultsJSON[2].name, resultsJSON[2].img_src)}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    useEffect(() => {
        let restaurant_names = resultsJSON.map((result: RestaurantResult) => result.name);
        let restaurant_imgs = resultsJSON.map((result: RestaurantResult) => result.img_src);

        if (location.state !== null && location.state.cuisines !== undefined && location.state.distance !== undefined) {
            // TODO: incorporate distance and query database based on cuisines.
            restaurant_names = location.state.cuisines;
            restaurant_imgs = ["../assets/logo.svg", "../logo192.png", "../logo512.png"];
            buildResults(restaurant_names, restaurant_imgs);
        } else if (location.state !== null && location.state.dishes !== undefined && location.state.distance !== undefined) {
            // TODO: incorporate distance and query database based on dishes.
            restaurant_names = ["restaurantA", "restaurantB", "restaurantC"];
            restaurant_imgs = ["../assets/logo.svg", "../logo192.png", "../logo512.png"];

            buildResults(restaurant_names, restaurant_imgs);
        } else if (location.state !== null && location.state.surprise_me !== undefined) {
            // TODO: incorporate distance and query database based on new experience.
            restaurant_names = ["restaurant", "restaurant2", "restaurant3"];
            restaurant_imgs = ["../assets/logo.svg", "../logo192.png", "../logo512.png"];
            buildResults(restaurant_names, restaurant_imgs);
        }
    });

    return (
        <React.Fragment>
            <section className="section-06-restaurant-results">
                <h1>Results</h1>
                <div id="restaurant-results-container">
                    {getVisitedUnvisitedResults()}
                </div>
            </section>
        </React.Fragment>
    );
};

export default RestaurantResults;
