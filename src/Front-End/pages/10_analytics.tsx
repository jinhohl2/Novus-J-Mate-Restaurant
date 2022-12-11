import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement
} from 'chart.js';
import { useAuth } from '../../User-Auth/AuthContext';
import axios from "axios";
import { type User, type Place } from "../../App";

const api = axios.create({
    baseURL: "http://localhost:4001/api/"
});

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, CategoryScale, LinearScale, BarElement);

interface RestaurantAndFrequency {
    "name": string,
    "frequency": number
}

const Analytics = () => {
    const [tabKey, setTabKey] = useState<string>("cuisine-distribution");
    const [visits, setVisits] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [numCuisines, setNumCuisines] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [freqVisitedRest, setFreqVisitedRest] = useState<RestaurantAndFrequency[]>([]);
    const { currentUser } = useAuth();
    const email = currentUser.email;
    let user: User | null = null;
    const cuisine_to_idx: { [key: string]: number } = {'italian': 0, 'indian': 1, 'mexican': 2, 'japanese': 3, 'chinese': 4, 'korean': 5,
                            'african': 6, 'american': 7, 'french': 8, 'british': 9, 'vietnamese': 10, 'thai': 11, 'other': 12}

    useEffect(() => {
        api.get('users').then((response) => {
            if (response.data) {
                user = response.data.data.find((user: User) => user.email === email);
                setVisits(user!.uniqueVisits);

                // Reset to default to prevent double counting.
                setNumCuisines([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                // Reset to default to prevent double counting.
                setFreqVisitedRest([]);

                api.get('places/').then((response) => {
                    if (response.data) {
                        response.data.data.forEach((restaurant: Place) => {
                            if (user!.placesVisited.includes(restaurant._id)) {
                                // Get cuisine distribution.
                                let idx = cuisine_to_idx[restaurant.cuisine.toString().toLowerCase()];
                                if (idx === undefined) {
                                    const otherCuisinesIdx = 13;
                                    idx = otherCuisinesIdx;
                                }

                                setNumCuisines((originalArray) => {
                                    const tempArray = [...originalArray];
                                    tempArray[idx] += 1;
                                    return tempArray;
                                });

                                // Get frequency of restaurant visits.
                                setFreqVisitedRest((originalArray) => {
                                    let found = false;
                                    let tempArray = [...originalArray];
                                    for (let i = 0; i < originalArray.length; i++) {
                                        if (tempArray[i].name === restaurant.name) {
                                            found = true;
                                            tempArray[i].frequency += 1;
                                        }
                                    }
                                    if (found !== true) {
                                        tempArray.push({"name": restaurant.name, "frequency": 1});
                                    }
                                    return tempArray;
                                });
                            }
                        });
                    }
                });
            }
        });
    }, []);

    function getCuisineData() {
        const chart_cuisine_distribution = {
            labels: ['Italian', 'Indian', 'Mexican', 'Japanese', 'Chinese', 'Korean',
                     'African', 'American', 'French', 'British', 'Vietnamese', 'Thai', 'Other'],
            datasets: [
              {
                label: 'Number of Visits',
                data: numCuisines,
                backgroundColor: [
                  'rgba(252, 28, 3, 0.5)',
                  'rgba(255, 221, 68, 0.5)',
                  'rgba(3, 11, 252, 0.5)',
                  'rgba(252, 3, 177, 0.5)',
                  'rgba(0, 0, 51, 0.5)',
                  'rgba(117, 34, 215, 0.5)',
                  'rgba(187, 0, 51, 0.5)',
                  'rgba(34, 85, 102, 0.5)',
                  'rgba(221, 204, 0, 0.5)',
                  'rgba(85, 255, 102, 0.5)',
                  'rgba(136, 0, 51, 0.5)',
                  'rgba(68, 187, 102, 0.5)',
                  'rgba(144,144,144, 0.5)'
                ],
                borderColor: [
                  'rgba(252, 28, 3, 1)',
                  'rgba(255, 221, 68, 1)',
                  'rgba(3, 11, 252, 1)',
                  'rgba(252, 3, 177, 1)',
                  'rgba(0, 0, 51, 1)',
                  'rgba(117, 34, 215, 1)',
                  'rgba(187, 0, 51, 1)',
                  'rgba(34, 85, 102, 1)',
                  'rgba(221, 204, 0, 1)',
                  'rgba(85,	255, 102, 1)',
                  'rgba(136, 0, 51, 1)',
                  'rgba(68, 187, 102, 1)',
                  'rgba(144, 144, 144, 1)'
                ],
                borderWidth: 1,
              },
            ],
        };
        return chart_cuisine_distribution;
    }

    function getFrequentRestaurantsSentence() {
        const topRestaurants = getFrequentRestaurants();
        if (topRestaurants.length == 0) {
            return "You haven't visited any restaurants yet. Check back here later to see your most visited restaurants!"
        } else if (topRestaurants.length == 1) {
            return `You're top restaurant is: ${topRestaurants[0].name}!`
        } else if ((topRestaurants.length == 2)) {
            return `You're top restaurants are: ${topRestaurants[0].name} and ${topRestaurants[1].name}!`
        }
        return `You're top restaurants are ${topRestaurants[0].name}, ${topRestaurants[1].name}, and ${topRestaurants[2].name}!`
    }

    function getFrequentRestaurants() {
        // Sort decending.
        const sortedArrays = freqVisitedRest.sort((a, b) => b.frequency - a.frequency).slice(0, 3);
        return sortedArrays;
    }

    function getFrequentData() {
        const topRestaurants = getFrequentRestaurants();
        let labels: string[] = [];
        let data: number[] = [];
        if (topRestaurants.length == 0) {
            labels = [];
            data = [];
        } else if (topRestaurants.length == 1) {
            labels = [topRestaurants[0].name];
            data = [topRestaurants[0].frequency];
        } else if ((topRestaurants.length == 2)) {
            labels = [topRestaurants[0].name, topRestaurants[1].name];
            data = [topRestaurants[0].frequency, topRestaurants[1].frequency];
        } else if ((topRestaurants.length == 3)) {
            labels = [topRestaurants[0].name, topRestaurants[1].name, topRestaurants[2].name];
            data = [topRestaurants[0].frequency, topRestaurants[1].frequency, topRestaurants[2].frequency];
        }

        const chart_frequent_restaurants = {
            labels: labels,
            datasets: [
              {
                label: 'Top Three Most Frequently Visited Restaurants',
                data: data,
                backgroundColor: 'rgb(135,206,250)',
              }
            ],
        };
        return chart_frequent_restaurants;
    }

    function getUniqueThisMonth() {
        const curr_date = new Date();
        const curr_month = curr_date.getMonth();
        const curr_month_visits = visits[curr_month];
        const restaurant_text = curr_month_visits === 1 ? " restaurant" : " restaurants";
        return curr_month_visits.toString() + restaurant_text;
    }

    function getUniqueData() {
        var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var data = visits;
        const curr_date = new Date();
        const curr_month = curr_date.getMonth();
        const num_months = 12;
        // Rotate labels to get last 12 months.
        for (let i = 0; i < (num_months - curr_month - 1); i++) {
            labels.unshift(labels.pop()!);
            data.unshift(data.pop()!);
        }

        const chart_unique_restaurants = {
            labels: labels,
            datasets: [{
                label: 'Visits to Restaurants',
                data: data,
                fill: false,
                borderColor: 'rgb(0,255,127)',
                tension: 0.1
            }]
        };
        return chart_unique_restaurants;
    }

    return (

        <React.Fragment>

            <section className="section-10-analytics">
                <Tabs id="analytics-tabs" activeKey={tabKey} onSelect={(tabKey) => setTabKey(tabKey ? tabKey : "cuisine-distribution")}>
                    <Tab className="analytics-tab" eventKey="cuisine-distribution" title="Cuisine Distribution">
                        <div id="pie-div">
                            <Pie data={getCuisineData()} />
                            <p>Click on the categories on the legend to remove or add them from the pie chart!</p>
                        </div>
                    </Tab>
                    <Tab className="analytics-tab" eventKey="unique-restaurants" title="Restaurants Visited">
                        <div id="line-div">
                            <Line data={getUniqueData()} />
                            <p>You've visited {getUniqueThisMonth()} this month!</p>
                        </div>
                    </Tab>
                    <Tab className="analytics-tab" eventKey="frequently-visited-restaurants" title="Frequently Visited Restaurants">
                        <div id="bar-div">
                            <Bar data={getFrequentData()} />
                            <p>{getFrequentRestaurantsSentence()}</p>
                        </div>
                    </Tab>
                </Tabs>
            </section>

        </React.Fragment>

    );
};

export default Analytics;
