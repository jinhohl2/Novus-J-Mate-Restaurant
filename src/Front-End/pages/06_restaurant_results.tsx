import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import { type Place, type User } from '../../App';
import { useAuth } from '../../User-Auth/AuthContext';

const api = axios.create({
    baseURL: "http://localhost:4001/api/"
});

const RestaurantResults = () => {
    // Type: string of Place[].
    const [resultsStringVisited, setResultsStringVisited] = useLocalStorage('resultsVisited', JSON.stringify([]));
    // Type: string of Place[].
    const [resultsStringUnvisited, setResultsStringUnvisited] = useLocalStorage('resultsUnvisited', JSON.stringify([]));
    const [restaurantsFoundString, setRestaurantsFoundString] = useState<Place[]>([]);
    const [user, setUser] = useState<User>({_id: "none", email: "none", Fname: "none",  Lname: "none",
                                            address: [], placesVisited: [], reviews: [],
                                            uniqueVisits: [], dateCreated: new Date()});
    const resultsJSONVisited = getStoredResultsVisited();
    const resultsJSONUnvisited = getStoredResultsUnvisited();
    const location = useLocation();
    const { currentUser } = useAuth();
    const email = currentUser.email;

    // useEffect(() => {
    //     api.get('users').then((response) => {
    //         if (response.data) {
    //             let foundUser = response.data.data.find((user: User) => user.email === email);
    //             if (foundUser !== null) {
    //                 setUser(foundUser);
    //             }
    //         }
    //     });

    //     api.get('places').then((response) => {
    //         if (response.data) {
    //             let returnedPlaces: Place[] = [];
    //             response.data.data.forEach((restaurant: Place) => {
    //                 returnedPlaces.push(restaurant);
    //             });
    //             setRestaurantsFoundString(returnedPlaces);
    //         }
    //     });
    // }, []);

    function getStoredResultsVisited() {
        return JSON.parse(resultsStringVisited);
    }

    function getStoredResultsUnvisited() {
        return JSON.parse(resultsStringUnvisited);
    }

    function buildResults(filteredRestaurantsVisited: Place[], filteredRestaurantsUnvisited: Place[]) {
        setResultsStringVisited(JSON.stringify(filteredRestaurantsVisited));
        setResultsStringUnvisited(JSON.stringify(filteredRestaurantsUnvisited));
    }

    function unvisitedText(rest_name: string, rest_img: string): JSX.Element {
        return (
            <div>
                <img src={`${rest_img}`} alt={"Restaurant: " + rest_name} />
                <h3>{rest_name}</h3>
            </div>
        );
    }

    function getVisitedUnvisitedResults() {
        // If there is >= visited results, place it in idx 0, visited/unvisited results can be placed in idx 1 or 2 if applicable.
        let results: Place[] = [];
        if (resultsJSONVisited.length >= 1) {
            // Array is shuffled.
            results.push(resultsJSONVisited[0]);
        }
        resultsJSONUnvisited.forEach((restaurant: Place) => {
            results.push(restaurant);
        });

        console.log("visited", resultsJSONVisited);
        console.log("unvisited", resultsJSONUnvisited);

        // Make sure images are valid or set to default.

        if (results.length === 0) {
            return (
                <div>
                    <div>
                        <div id="none-recommendation-block">
                            <h2>No restaurants matched your search query. Please try searching again.</h2>
                        </div>
                    </div>
                </div>
            )
        } else if (results.length === 1) {
            return (
                <div>
                    <div>
                        <div id="one-recommendation-block">
                            <h2>Your restaurant match!</h2>
                            <Link to={"/restaurant-results/1"}>
                                <img src={`${results[0].imageUrl}`} alt={"Restaurant: " + results[0].name} />
                                <h3>{results[0].name}</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if (results.length === 2) {
            return (
                <div>
                    <div>
                        <div id="only-not-visited-restaurant-recommendation-block">
                            <h2>Your matches!</h2>
                            <div>
                                <Link to={"/restaurant-results/1"}>
                                    <img src={`${results[0].imageUrl}`} alt={"Restaurant: " + results[0].name} />
                                    <h3>{results[0].name}</h3>
                                </Link>
                                <Link to={"/restaurant-results/2"}>
                                    <img src={`${results[1].imageUrl}`} alt={"Restaurant: " + results[1].name} />
                                    <h3>{results[1].name}</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        // Three results.
        if (resultsJSONVisited.length >= 1) {
            return (
                <div>
                    <div>
                        <div id="visited-restaurant-recommendation-block">
                            <h2>Visited</h2>
                            <h5>Revisit a place you know and love!</h5>
                            <Link to={"/restaurant-results/1"}>
                                <img src={`${results[0].imageUrl}`} alt={"Restaurant: " + results[0].name} />
                                <h3>{results[0].name}</h3>
                            </Link>
                        </div>

                        <div id="not-visited-restaurant-recommendation-block">
                            <h2>Unexplored</h2>
                            <h5>Expand the horizons of your palette!</h5>
                            <div>
                                <Link to={"/restaurant-results/2"}>
                                    {unvisitedText(results[1].name, results[1].imageUrl)}
                                </Link>
                                <Link to={"/restaurant-results/3"}>
                                    {unvisitedText(results[2].name, results[2].imageUrl)}
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
                                {unvisitedText(results[0].name, results[0].imageUrl)}
                            </Link>
                            <Link to={"/restaurant-results/2"}>
                                {unvisitedText(results[1].name, results[1].imageUrl)}
                            </Link>
                            <Link to={"/restaurant-results/3"}>
                                {unvisitedText(results[2].name, results[2].imageUrl)}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    function getVisitedPlaces() {
        const restaurantsFound = JSON.parse(JSON.stringify(restaurantsFoundString));
        const places: Place[] = [];
        restaurantsFound.forEach((restaurant: Place) => {
            if (user.placesVisited.includes(restaurant._id)) {
                places.push(restaurant);
            }
        });

        return places;
    }

    function getUnvisitedPlaces() {
        const restaurantsFound = JSON.parse(JSON.stringify(restaurantsFoundString));
        const places: Place[] = [];
        restaurantsFound.forEach((restaurant: Place) => {
            if (!user.placesVisited.includes(restaurant._id)) {
                places.push(restaurant);
            }
        });

        return places;
    }

    useEffect(() => {
        // Use the same restaurants.
        if (location.state === null) {
            return;
        }

        api.get('users').then((response) => {
            if (response.data) {
                let foundUser = response.data.data.find((user: User) => user.email === email);
                if (foundUser !== null) {
                    setUser(foundUser);
                }
            }
        });

        api.get('places').then((response) => {
            if (response.data) {
                let returnedPlaces: Place[] = [];
                response.data.data.forEach((restaurant: Place) => {
                    returnedPlaces.push(restaurant);
                });
                setRestaurantsFoundString(returnedPlaces);
            }
        });

        let foundRestaurantResultsVisited: Place[] = getVisitedPlaces();
        let foundRestaurantResultsUnvisited: Place[] = getUnvisitedPlaces();

        let filteredRestaurantsVisited: Place[] = [];
        let filteredRestaurantsUnvisited: Place[] = [];

        if (location.state !== null && location.state.cuisines !== undefined && location.state.distance !== undefined) {
            //buildResults(filteredRestaurantsVisited, filteredRestaurantsUnvisited);
        } else if (location.state !== null && location.state.dishes !== undefined && location.state.distance !== undefined) {

            //buildResults(filteredRestaurantsVisited, filteredRestaurantsUnvisited);
        } else if (location.state !== null && location.state.surprise_me !== undefined) {
            // If the array is less than 3, set filtered to that array, otherwise get a random slice or 3.
            filteredRestaurantsVisited = foundRestaurantResultsVisited.length >= 3 ? foundRestaurantResultsVisited.sort(() => Math.random() - Math.random()).slice(0, 3) : foundRestaurantResultsVisited;
            filteredRestaurantsUnvisited = foundRestaurantResultsUnvisited.length >= 3 ? foundRestaurantResultsUnvisited.sort(() => Math.random() - Math.random()).slice(0, 3) : foundRestaurantResultsUnvisited;
            console.log("1", filteredRestaurantsVisited, filteredRestaurantsUnvisited)
            buildResults(filteredRestaurantsVisited, filteredRestaurantsUnvisited);
        }
    }, []);

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
