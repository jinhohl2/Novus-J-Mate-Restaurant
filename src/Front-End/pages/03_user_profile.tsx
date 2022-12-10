import React from 'react';
import '../scss/App.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faCancel, faUpload } from '@fortawesome/free-solid-svg-icons'

const UserProfile = () => {



    return (

        <React.Fragment>
            <section className="section-03-user-profile">
                <div className="user-profile-content">
                    <div className="div-user-details">
                        <div className="user-image">
                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                        </div>
                        <div className="user-detail-items">
                            <ul>
                                <li>
                                    <h1>Johnny Depp</h1>
                                </li>
                                <li>
                                    <h6>@johnnydepp</h6>
                                </li>
                                <li>
                                    <h6>Champaign, Illinois</h6>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="nav-edit-user-and-view-restaurant-visit-history">

                        <section className="navbar">
                            <button id="user-profile">
                                User-Profile
                            </button>
                            <button id="visited-restaurants">
                                Visited-Restaurants
                            </button>
                            <button id="button-logout">
                                Logout
                            </button>
                        </section>

                        <section className="section-user-profile">

                            <div className="div-edit-cancel-save">

                                <button id="edit">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                                <button id="cancel">
                                    <FontAwesomeIcon icon={faCancel} /> Cancel
                                </button>
                                <button id="save">
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>

                            </div>

                            <div className="div-user-profile-content">
                                <div className="upload-photo">
                                    <label>
                                        Upload Photo:
                                    </label>
                                    <button id="button-upload">
                                        <FontAwesomeIcon icon={faUpload} /> Upload
                                    </button>
                                </div>

                                <div className="username">
                                    <label>
                                        Username:
                                    </label>
                                    <input placeholder="Enter the username"/>
                                </div>

                                <div className="first-name">
                                    <label>
                                        First Name:
                                    </label>
                                    <input placeholder="Enter the first name"/>
                                </div>
                                <div className="last-name">
                                    <label>
                                        Last Name:
                                    </label>
                                    <input placeholder="Enter the last name"/>
                                </div>

                                <div className="add-on-email">
                                    <label>
                                        Add-on Email:
                                    </label>
                                    <input placeholder="(Optional) Enter the add-on email"/>
                                </div>

                                <div className="password-div">
                                    <label className="password-label">
                                        Password:
                                    </label>

                                    <input className="password-input" placeholder="Enter password"/>
                                    <input className="re-enter-password-input" placeholder="Re-enter password"/>

                                </div>

                            </div>
                        </section>

                        <section className="section-visited-restaurant">


                            <div className="div-restaurant-list">
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                                <ul className="restaurant-listing">
                                        <li className="user-image-li">
                                            <img src="https://media.glamour.es/photos/616f801d66688768fd3ae584/master/w_1600%2Cc_limit/672532.jpg" alt="Johnny Depp"/>
                                        </li>
                                        <li className="label">
                                            <h6>Restaurant Name</h6>
                                        </li>
                                        <li className="label">
                                            <h6>Location</h6>
                                        </li>
                                    </ul>
                            </div>


                            <h3>Restaurant ratings:</h3>

                            <div className="div-by-self-restaurant-rating-details">
                                <div className="ratings-reviews-by-self-label">
                                    By self
                                </div>

                                <div className="ratings-by-self-label">
                                    Ratings by self
                                </div>

                                <div className="reviews-by-self-label">
                                    Reviews by self
                                </div>

                            </div>

                            <div className="div-by-others-restaurant-rating-details">
                                <div className="ratings-reviews-by-others-label">
                                    By others
                                </div>

                                <div className="ratings-by-others-label">
                                    Ratings by others
                                </div>

                                <div className="reviews-by-others-label">
                                    Reviews by others
                                </div>

                            </div>


                            <h3>Menu details:</h3>

                            <div className="div-dish-details">

                                <h3 /> Dish One
                                <div className="dish-one">

                                    <div className="dish-image">
                                        Image of the dish
                                    </div>

                                    <div className="dish-desc-ingredients">
                                        Description and ingredients of the dish
                                    </div>



                                    <div className="dish-price">
                                        Price of the dish
                                    </div>

                                    <div className="ratings-by-self">
                                        Ratings by self
                                    </div>

                                    <div className="reviews-by-self">
                                        Reviews by self
                                    </div>

                                    <div className="ratings-by-others">
                                        Ratings by others
                                    </div>

                                    <div className="reviews-by-others">
                                        Reviews by others
                                    </div>

                                </div>

                                <h3 /> Dish Two
                                <div className="dish-one">

                                    <div className="dish-image">
                                        Image of the dish
                                    </div>

                                    <div className="dish-desc-ingredients">
                                        Description and ingredients of the dish
                                    </div>



                                    <div className="dish-price">
                                        Price of the dish
                                    </div>

                                    <div className="ratings-by-self">
                                        Ratings by self
                                    </div>

                                    <div className="reviews-by-self">
                                        Reviews by self
                                    </div>

                                    <div className="ratings-by-others">
                                        Ratings by others
                                    </div>

                                    <div className="reviews-by-others">
                                        Reviews by others
                                    </div>

                                </div>

                            </div>


                        </section>



                    </div>
                </div>
            </section>
        </React.Fragment>

    );
};

export default UserProfile;
