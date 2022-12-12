import React from 'react';
import '../src/Front-End/scss/App.scss';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from "./Front-End/pages/00_nav_bar";
import LogInView from "./Front-End/pages/01_log_in";
import SignUpView from "./Front-End/pages/02_sign_up";
import UserProfile from "./Front-End/pages/03_user_profile";
import Dashboard from "./Front-End/pages/04_dashboard";
import MainSearchCriterias from "./Front-End/pages/05_main_search_criterias";
import RestaurantResults from "./Front-End/pages/06_restaurant_results";
import RestaurantDetails from "./Front-End/pages/07_restaurant_details";
import FindFriends from "./Front-End/pages/08_find_friends";
import ProfileOfFriends from "./Front-End/pages/09_profile_of_friends";
import Analytics from "./Front-End/pages/10_analytics";
import FrontPage from './Front-End/pages/11_front_page';

export interface User {
    "_id": string,
    "email": string,
    "Fname": string,
    "Lname": string,
    "address": number[]
    "placesVisited": string[],
    "reviews": string[],
    "uniqueVisits": number[],
    "lastClick": Date,
    "dateCreated": Date
    
}

export interface Place {
  "_id": string,
  "name": string,
  "address": number[],
  "cuisine": string,
  "dishes": string[],
  "usersVisited": string[],
  "reviews": string[],
  "imageUrl": string,
  "websiteUrl": string,
  "dateCreated": Date
}

export interface Review {
    "_id": string,
    "restaurant": string,
    "restaurantName": string,
    "authorID": string,
    "rating": number,
    "description": string,
    "dateCreated": Date,
}

const api = axios.create({
  baseURL: "http://localhost:4001/api/"
});

function App() {
    const [restaurants, setRestaurants] = useState<Place[]>([]);
    useEffect(() => {
        api.get('places').then((response) => {
          const tempArray: Place[] = [];
          if (response.data) {
            const restaurantsFound = response.data.data;
            restaurantsFound.forEach((restaurantFound: Place) => {
              tempArray.push(restaurantFound);
            })
          }
          setRestaurants(tempArray)
        }
    )}, []);

    return (
        <React.Fragment>
            <Router>
                <NavBar />

                <Routes>
                    <Route path={"/"} element={<FrontPage></FrontPage>}></Route>
                    <Route path={"/log-in"} element={<LogInView></LogInView>}></Route>
                    <Route path={"/sign-up"} element={<SignUpView></SignUpView>}></Route>
                    <Route path={"/user-profile"} element={<UserProfile></UserProfile>}></Route>
                    <Route path={"/dashboard"} element={<Dashboard></Dashboard>}></Route>
                    <Route path={"/main-search-criteria"} element={<MainSearchCriterias></MainSearchCriterias>}></Route>
                    <Route path={"/restaurant-results"} element={<RestaurantResults restaurants={restaurants}></RestaurantResults>}></Route>
                    <Route path={"/restaurant-results/1"} element={<RestaurantDetails></RestaurantDetails>}></Route>
                    <Route path={"/restaurant-results/2"} element={<RestaurantDetails></RestaurantDetails>}></Route>
                    <Route path={"/restaurant-results/3"} element={<RestaurantDetails></RestaurantDetails>}></Route>
                    <Route path={"/restaurant-details"} element={<RestaurantDetails></RestaurantDetails>}></Route>
                    <Route path={"/find-friends"} element={<FindFriends></FindFriends>}></Route>
                    <Route path={"/profile-of-friends"} element={<ProfileOfFriends></ProfileOfFriends>}></Route>
                    <Route path={"/analytics"} element={<Analytics></Analytics>}></Route>

                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;
