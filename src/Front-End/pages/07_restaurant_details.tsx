import React from 'react';

const RestaurantDetails = () => {
    const menu_items = [{
        name: "raw chicken leg",
        about_dish: "straight from the factory farms of Urbana",
        price: 13,
        rating_self: 1,
        rating_others: 4
    }];

    return (
        <React.Fragment>
            <section className="section-07-restaurant-details">
                <div id='restaurant-div'>
                    <img src="" alt="Restaurant image" />
                    <h2>Restaurant name</h2>
                    <h5>Number: 314 159 2653</h5>
                    <h5>Get directions</h5>
                    <a href="google.com">Website</a>
                </div>

                <div id='details-div'>
                    <div id='coupon'>
                        <h2>Unique one-time coupons for you:</h2>
                    </div>

                    <div id='ratings-and-reviews'>
                        <div id='ratings-self'></div>
                        <div id='ratings-others'></div>
                    </div>

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
                </div>
            </section>
        </React.Fragment>
    );
};

export default RestaurantDetails;
