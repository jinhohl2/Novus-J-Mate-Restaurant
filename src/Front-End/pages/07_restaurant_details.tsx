import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";

const RestaurantDetails = () => {
    const [tabKey, setTabKey] = useState<string>("ratingsReviewsKey");
    const [code, SetCode] = useState<string>("");

    const menu_items = [{
        name: "raw chicken leg",
        about_dish: "straight from the factory farms of Urbana",
        price: 13,
        rating_self: 1,
        rating_others: 4
    }];

    function getCode() {
        SetCode(crypto.randomUUID());
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
                    <img src="" alt="Restaurant image" />
                    <h2>Restaurant name</h2>
                    <h5>Number: 314 159 2653</h5>
                    <h5>Get directions</h5>
                    <a href="google.com">Website</a>
                </div>
                <div id="restaurant-details-div">
                <Tabs id="restaurant-details-tabs" activeKey={tabKey} onSelect={(tabKey) => setTabKey(tabKey ? tabKey : "ratingsReviewsKey")}>
                    <Tab className="restaurant-details-tab" eventKey="ratingsReviewsKey" title="Ratings and Reviews">
                        <div id='ratings-self'></div>
                        <div id='ratings-others'></div>
                    </Tab>

                    <Tab className="restaurant-details-tab" eventKey="menuKey" title="Menu">
                        <div id='menu-details'>
                            {menu_items.map((item) => {
                                return <div>
                                    <h3>{item.name}</h3>
                                    <h5>{item.about_dish}</h5>
                                    <h4>{item.price}</h4>
                                    <h5>Rating by me: {item.rating_self}</h5>
                                    <h5>Ratings by others: {item.rating_others}</h5>
                                </div>
                            })}
                        </div>
                    </Tab>

                    <Tab className="restaurant-details-tab" eventKey="notesReviewsKey" title="Own Notes and Reviews">
                        <div id='notes-and-reviews-by-self'>
                            <div id='notes-by-self'>
                                <h2>Private notes (Visible only to self)</h2>

                                <div id='notes-buttons'>
                                    <button className='edit'>Edit</button>
                                    <button className='cancel'>Cancel</button>
                                    <button className='submit'>Submit</button>
                                </div>

                                <textarea id="notes-by-self-textarea" cols={30} rows={10}></textarea>
                            </div>

                            <div id='ratings-after-visit'>
                                <h2>Submit ratings after visit</h2>

                                <div id='reviews-buttons'>
                                    <button className='edit'>Edit</button>
                                    <button className='cancel'>Cancel</button>
                                    <button className='submit'>Submit</button>
                                </div>

                                <textarea id="reviews-by-self-textarea" cols={30} rows={10}></textarea>
                            </div>
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
