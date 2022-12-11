import React from 'react';
import DistanceToLocationComponent from '../components/04_distance_to_location'
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from "react";
import CuisineChoice from '../components/05_cuisine_box';
import DishChoice from '../components/06_dish_box';
import { Link } from 'react-router-dom';

const MainSearchCriterias = () => {
    const [tabKey, setTabKey] = useState<string>("cuisine");
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [distance, setDistance] = useState<number>(70);

    const cuisines = ["Italian", "Indian", "Mexican", "Japanese", "Chinese", "Korean", "African", "American", "French", "British", "Vietnamese", "Thai", "Other"];
    const img_srcs = ["../assets/italian-food.jpg", "../assets/indian-food.jpg", "../assets/mexican-food.jpg", "../assets/japanese-food.jpg", "../assets/chinese-food.jpg",
                      "../assets/korean-food.jpg", "../assets/nigerian-food.jpg", "../assets/american-food.jpg", "../assets/french-food.jpg", "../assets/uk-food.jpg",
                      "../assets/vietnamese-food.jpg", "../assets/thai-food.jpg", "../assets/other-food.jpg"];

    function updateSelectedCuisines(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const cuisine = String((e.target as Element).getAttribute('cuisine-group'));

        // Set component as active on first click, and remove on second click to help modify state and change component appearance.
        if (selectedCuisines.includes(cuisine)) {
            setSelectedCuisines(selectedCuisines.filter(curr_cuisine => curr_cuisine !== cuisine));
        } else {
            setSelectedCuisines([...selectedCuisines, cuisine]);
        }
    }

    function updateSelectedDishes(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const dish = String((e.target as Element).getAttribute('dish-group'));
        const max_dishes = 3;

        if (!selectedDishes.includes(dish) && selectedDishes.length < max_dishes) {
            setSelectedDishes([...selectedDishes, dish]);
        }
    }

    function getCuisineBoxes() {
        const cuisineBoxes = [];
        for (let i = 0; i < cuisines.length; i++) {
            cuisineBoxes.push(<CuisineChoice img_src={img_srcs[i]} cuisine_type={cuisines[i]} selectedDishFunc={updateSelectedCuisines} key={cuisines[i] + " section"}></CuisineChoice>);
        }

        return cuisineBoxes;
    }

    function UpdateSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSearchQuery(e.target.value);
    }

    function removeFromSelectedDish(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const dish = String((e.target as Element).getAttribute('dish-group'));

        // Remove dish when user clicks on a selected dish (to deselect it).
        if (selectedDishes.includes(dish)) {
            setSelectedDishes(selectedDishes.filter(curr_dish => curr_dish !== dish));
        }
    }

    function getDishBoxes() {
        const dishBoxes = [];
        //TODO: update to query dishes.
        let dishes = ["dish1", "dish2", "dish3", "dish4", "dish5", "dish6", "dish7", "dish8", "dish9"];
        for (let i = 0; i < dishes.length; i++) {
            dishBoxes.push(<DishChoice dish_name={dishes[i]} selectedDishFunc={updateSelectedDishes} key={dishes[i] + " section"}></DishChoice>);
        }

        return dishBoxes;
    }

    return (
        <React.Fragment>

            <section className="section-05-main-search-criterias">
                <DistanceToLocationComponent setDistance={setDistance} distance={distance}></DistanceToLocationComponent>
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
                                    <Link to={{pathname: "/restaurant-results" }} state={{ cuisines: selectedCuisines, distance: distance }} >
                                        <button id="generate-results-from-cuisines">Generate Restaurants</button>
                                    </Link>
                                </div>
                            </div>
                        </Tab>

                        <Tab className="criteria-tab" eventKey="dish" title="Dish">
                            <div className="search-criteria-tab-content">
                                <div id="search-bar-dish-name-container">
                                    <input id="search-bar-dish-name" type="text" onChange={UpdateSearchQuery} value={searchQuery} placeholder={"Search the names of your favorite dishes!"}/>
                                    <div>
                                        <div id="chosen-dishes-and-generate">
                                            <div id="chosen-dishes-display">
                                                {selectedDishes.map(
                                                    (dish: string) => {
                                                        return (
                                                            <div onClick={removeFromSelectedDish} dish-group={dish}>
                                                                <h5 dish-group={dish}>{dish}</h5>
                                                            </div>
                                                        )
                                                })}
                                            </div>
                                            <Link to={{pathname: "/restaurant-results" }} state={{ dishes: selectedDishes, distance: distance }} >
                                                <button id="generate-results-from-dishes">Generate Restaurants</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div id="matching-dishes-container">
                                        <h4>Matching Dishes</h4>
                                        <div id="dishes-block">
                                            {getDishBoxes()}
                                        </div>
                                    </div>
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
