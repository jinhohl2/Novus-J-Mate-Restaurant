import React from 'react';
import DistanceToLocationComponent from '../components/04_distance_to_location copy'
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from "react";
import CuisineChoice from '../components/05_cuisine_box';
import { Link } from 'react-router-dom';

const MainSearchCriterias = () => {
    const [tabKey, setTabKey] = useState<string>("cuisine");
    const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const cuisines = ["Italian", "Indian", "Mexican", "Japanese", "Chinese", "Korean", "Nigerian", "American", "French", "U.K.", "Vietnamese", "Thai", "Other"];
    const img_srcs = ["../assets/italian-food.jpg", "../assets/indian-food.jpg", "../assets/mexican-food.jpg", "../assets/japanese-food.jpg", "../assets/chinese-food.jpg",
                      "../assets/korean-food.jpg", "../assets/nigerian-food.jpg", "../assets/american-food.jpg", "../assets/french-food.jpg", "../assets/uk-food.jpg",
                      "../assets/vietnamese-food.jpg", "../assets/thai-food.jpg", "../assets/other-food.jpg"];

    function updateSelectedDish(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const cuisine = String((e.target as Element).getAttribute('cuisine-group'));

        // Set component as active on first click, and remove on second click to help modify state and change component appearance.
        if (selectedDishes.includes(cuisine)) {
            setSelectedDishes(selectedDishes.filter(curr_cuisine => curr_cuisine !== cuisine))
        } else {
            setSelectedDishes([...selectedDishes, cuisine]);
            console.log([...selectedDishes, cuisine])
        }
    }

    function getCuisineBoxes() {
        const cuisineBoxes = [];
        for (let i = 0; i < cuisines.length; i++) {
            cuisineBoxes.push(<CuisineChoice img_src={img_srcs[i]} cuisine_type={cuisines[i]} selectedDishFunc={updateSelectedDish} key={cuisines[i] + " section"}></CuisineChoice>);
        }

        return cuisineBoxes;
    }

    function UpdateSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    return (
        <React.Fragment>

            <section className="section-05-main-search-criterias">
                <DistanceToLocationComponent></DistanceToLocationComponent>
                <div id="search-criteria-tabs-container">
                    <Tabs id="search-criteria-tabs" activeKey={tabKey} onSelect={(tabKey) => setTabKey(tabKey ? tabKey : "cuisine")}>
                        <Tab className="criteria-tab" eventKey="cuisine" title="Cuisine">
                            <div id="cuisine-search-instructions">
                                <p>Choose one or more cuisines you would like to explore then generate restaurants based on your choice. Or, generate restaurants immediately to find restaurants of any cuisine. </p>
                            </div>
                            <div className="search-criteria-tab-content">
                                <div id="cusines-with-button">
                                    <div id="cuisines-block">
                                        {getCuisineBoxes()}
                                    </div>
                                    <Link to={{pathname: "/restaurant-results" }} state={{ cuisines: cuisines }} >
                                        <button id="generate-results-from-cuisines">Generate Restaurants</button>
                                    </Link>
                                </div>
                            </div>
                        </Tab>

                        <Tab className="criteria-tab" eventKey="dish" title="Dish">
                            <div className="search-criteria-tab-content">
                                <div id="search-bar-dish-name-container">
                                    <input id="search-bar-dish-name" type="text" onChange={UpdateSearchQuery} value={searchQuery} placeholder={"Search the names of your favorite dishes!"}/>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>

        </React.Fragment>
    );
};

export default MainSearchCriterias;
