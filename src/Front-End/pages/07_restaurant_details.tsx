import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, Location, useLocation } from "react-router-dom";
import { Place, User } from '../../App';
import { useAuth } from '../../User-Auth/AuthContext';

const RestaurantDetails = () => {
    const { currentUser } = useAuth();
    const email = currentUser.email;

    const [tabKey, setTabKey] = useState<string>("ratingsReviewsKey");
    const [code, setCode] = useState<string>("");
    const [currUser, setCurrUser] = useState<User>({
        _id: "none", email: "none", Fname: "none", Lname: "none",
        address: [], placesVisited: [], reviews: [],
        lastClick: new Date(),
        uniqueVisits: [], dateCreated: new Date()
    });
    // eslint-disable-next-line
    const [visitorNames, setVisitorNames] = useState<string[]>([]);

    let location: Location = useLocation();
    let restaurant: Place = location.state.restaurant;
    let userIDs = restaurant.usersVisited;

    const api = axios.create({
        baseURL: "http://localhost:4001/api/"
    });

    function getCode() {
        setCode(crypto.randomUUID());
    }

    useEffect(() => {
        api.get("users").then((response) => {
            if (response.data) {
                let users = response.data.data;
                setCurrUser(users.filter((user: User) => user.email === email)[0]);
                let tempArr: string[] = [];
                userIDs.forEach((userID) => {
                    let user = users.filter((temp: User) => {
                        return temp._id === userID;
                    })[0];
                    tempArr.push(`${user?.Fname} ${user?.Lname}`);
                });
                setVisitorNames(tempArr);
            }
        });
    }, []);

    function visited() {
        /* put restaurant */
        let payloadRestaurant = restaurant;
        payloadRestaurant.usersVisited.push(currUser._id);
        api.put(`places/${restaurant._id}`, payloadRestaurant)
            .catch((error) => { console.log(`Error updating restaurant after visit button is clicked\n${error}`) });

        /* put user */
        let payloadUser = currUser;
        payloadUser.placesVisited.push(restaurant._id);
        payloadUser.uniqueVisits[payloadUser.uniqueVisits.length - 1]++;
        console.log(payloadUser);
        api.put(`users/${currUser._id}`, payloadUser)
            .catch((error) => { console.log(`Error updating user after visit button is clicked\n${error}`) });
    }

    return (
        <React.Fragment>
            <section className="section-07-restaurant-details">
                <div id="back-to-results-container">
                    <Link to="/restaurant-results">
                        <button>
                            Back
                        </button>
                    </Link>
                </div>

                <div id='restaurant-div'>
                    <img src={restaurant.imageUrl} alt="Restaurant picture" />
                    <h2>{restaurant.name}</h2>
                    <h5>Address: {restaurant.address.join(", ")}</h5>
                    <h5>Cuisine: {restaurant.cuisine}</h5>
                    <a href={restaurant.websiteUrl}>Website</a>
                    <button onClick={visited}>Visit</button>
                </div>

                <div id="restaurant-details-div">
                    <Tabs id="restaurant-details-tabs" activeKey={tabKey} onSelect={(tabKey) => setTabKey(tabKey ? tabKey : "ratingsReviewsKey")}>
                        <Tab className="restaurant-details-tab" eventKey="menuKey" title="Top Menu Items">
                            <div id='menu-details'>
                                {restaurant.dishes.map(dish => <h3>{dish}</h3>)}
                            </div>
                        </Tab>

                        <Tab className="restaurant-details-tab" eventKey="couponKey" title="Coupons">
                            <div id='coupon'>
                                <button onClick={getCode}>Generate Code</button>
                                <h3>{code}</h3>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </React.Fragment>
    );
};

export default RestaurantDetails;
