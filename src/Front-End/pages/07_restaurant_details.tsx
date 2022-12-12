import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, Location, useLocation } from "react-router-dom";
import { Place, User } from '../../App';

const RestaurantDetails = () => {
    const [tabKey, setTabKey] = useState<string>("ratingsReviewsKey");
    const [code, setCode] = useState<string>("");
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
                    <a href={restaurant.websiteUrl}>Website</a>
                </div>

                <div id="restaurant-details-div">
                    <Tabs id="restaurant-details-tabs" activeKey={tabKey} onSelect={(tabKey) => setTabKey(tabKey ? tabKey : "ratingsReviewsKey")}>
                        <Tab className="restaurant-details-tab" eventKey="ratingsReviewsKey" title="Ratings and Reviews">
                            {/* TODO: // MAP RATINGS HERE */}
                            {/* <div id='ratings-self'></div> */}
                            <div id='ratings-others'>

                            </div>
                        </Tab>


                        <Tab className="restaurant-details-tab" eventKey="menuKey" title="Top Menu Items">
                            <div id='menu-details'>
                                {restaurant.dishes.map(dish => <h3>{dish}</h3>)}
                            </div>
                        </Tab>

                        <Tab className="restaurant-details-tab" eventKey="visitorsKey" title="Past Visitors">
                            <div id='past-visitors'>
                                {visitorNames.map(visitor => <h3>{visitor}</h3>)}
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
