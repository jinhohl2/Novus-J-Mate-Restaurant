import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import RestaurantDetails from "./07_restaurant_details"
import { useLocation as ul } from 'react-router-dom'

interface RestaurantResults {
    name: string,
    img_src: string
}

// interface RestaurantResultsProps {
//     dist_in_miles?: number,
//     cuisines?: string[],
//     dishes?: string[],
//     surprise_me?: boolean
// }

const RestaurantResults = () => {
    const [results, setResults] = useState<RestaurantResults[]>([{name: "restaurant1", img_src: "../assets/logo.svg"},
                                                                 {name: "restaurant2", img_src: "../logo192.png"},
                                                                 {name: "restaurant3", img_src: "../logo512.png"}]);

    function unvisitedText(rest_name: string, rest_img: string): JSX.Element {
        return (
            <div>
                <img src={`${process.env.PUBLIC_URL}${rest_img}`} alt={rest_name} />
                <h3>{rest_name}</h3>
            </div>
        );
    }

    // TODO: add restaurant to arguments
    function getVisitedUnvisitedResults(restaurant_names: string[], restaurant_imgs: string[]) {
         // TODO: change condition to check if the user has been to any restaurants matching their search parameters.
         if (true) {
            return (
                <div>
                    <div>
                        <div id="visited-restaurant-recommendation-block">
                            <h2>Visited</h2>
                            <h5>Revisit a place you know and love!</h5>
                            <Link to={"/restaurant-results/1"}>
                                <img src={`${process.env.PUBLIC_URL}${restaurant_imgs[0]}`} alt={restaurant_names[0]} />
                                <h3>{restaurant_names[0]}</h3>
                            </Link>
                        </div>

                        <div id="not-visited-restaurant-recommendation-block">
                            <h2>Unexplored</h2>
                            <h5>Expand the horizons of your palette!</h5>
                            <div>
                                <Link to={"/restaurant-results/2"}>
                                    {unvisitedText(restaurant_names[1], restaurant_imgs[1])}
                                </Link>
                                <Link to={"/restaurant-results/3"}>
                                {   unvisitedText(restaurant_names[2], restaurant_imgs[2])}
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
                                {unvisitedText(restaurant_names[0], restaurant_imgs[0])}
                            </Link>
                            <Link to={"/restaurant-results/2"}>
                                {unvisitedText(restaurant_names[1], restaurant_imgs[1])}
                            </Link>
                            <Link to={"/restaurant-results/3"}>
                                {unvisitedText(restaurant_names[2], restaurant_imgs[2])}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function getResults() {
        const location = ul();
        console.log(location)

        // placeholder
        let restaurant_names = ["restaurant1", "restaurant2", "restaurant3"];
        let restaurant_imgs = ["../assets/logo.svg", "../logo192.png", "../logo512.png"];

        if (location.state && !location.state.cuisines && !location.state.dishes && !location.state.surprise_me) {
            restaurant_names = results.map(result => result.name);
            restaurant_imgs = results.map(result => result.img_src);
        } else if (location.state && location.state.cuisines) {
            // TODO: incorporate distance and query database based on cuisines.
            restaurant_names = ["restaurant1A", "restaurant2A", "restaurant3A"];
            restaurant_imgs = ["../assets/logo.svg2", "../logo192.png2", "../logo512.png"];
        } else if (location.state && location.state.dishes) {
            // TODO: incorporate distance and query database based on dishes.
        } else if (location.state && location.state.surprise_me) {
            // TODO: incorporate distance and query database based on new experience.
        }

        useEffect(() => setResults([{name: restaurant_names[0], img_src: restaurant_imgs[0]}, {name: restaurant_names[1], img_src: restaurant_imgs[1]}, {name: restaurant_names[2], img_src: restaurant_imgs[2]}]), [results])

        return (
            <div>
                {getVisitedUnvisitedResults(restaurant_names, restaurant_imgs)}
            </div>
        );
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
