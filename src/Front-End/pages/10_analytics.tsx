import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, CategoryScale, LinearScale, BarElement);

// TODO: Pass 'User' as prop once it is defined on backend schema.
const Analytics = () => {
    const [tabKey, setTabKey] = useState<string>("cuisine-distribution");

    function getCuisineData() {
        const chart_cuisine_distribution = {
            labels: ['Italian', 'American', 'Indian', 'Korean', 'Others'],
            datasets: [
              {
                label: 'Number of Visits',
                data: [4, 5, 3, 5, 2],
                backgroundColor: [
                  'rgba(252, 28, 3, 0.5)',
                  'rgba(3, 252, 15, 0.5)',
                  'rgba(3, 11, 252, 0.5)',
                  'rgba(252, 3, 177, 0.5)',
                  'rgba(144,144,144, 0.5)'
                ],
                borderColor: [
                  'rgba(252, 28, 3, 1)',
                  'rgba(3, 252, 15, 1)',
                  'rgba(3, 11, 252, 1)',
                  'rgba(252, 3, 177, 1)',
                  'rgba(144,144,144, 1)'
                ],
                borderWidth: 1,
              },
            ],
        };
        return chart_cuisine_distribution;
    }

    function getFrequentRestaurantsSentance() {
        const restaurants = getFrequentRestaurants();
        return `You're top three restaurants are ${restaurants[0]}, ${restaurants[1]}, and ${restaurants[2]}!`
    }

    function getFrequentRestaurants() {
        const labels = ['Taco bell', 'Ko Fusion', 'Oozu Ramen']
        return labels;
    }

    function getFrequentData() {
        const labels = ['Taco bell', 'Ko Fusion', 'Oozu Ramen']
        const chart_frequent_restaurants = {
            labels: labels,
            datasets: [
              {
                label: 'Top Three Most Frequently Visited Restaurants',
                data: [20, 18, 15], // sorted
                backgroundColor: 'rgb(135,206,250)',
              }
            ],
        };
        return chart_frequent_restaurants;
    }

    function getUniqueThisMonth() {
        var data = [2, 0, 1, 2, 2, 3, 4, 1, 0, 1, 1, 2];
        const curr_date = new Date();
        const curr_month = curr_date.getMonth();
        return data[curr_month];
    }

    function getUniqueData() {
        var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var data = [2, 0, 1, 2, 2, 3, 4, 1, 0, 1, 1, 2];
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
                label: 'Visits to New Restaurants',
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
                    <Tab className="analytics-tab" eventKey="unique-restaurants" title="Unique Restaurants">
                        <div id="line-div">
                            <Line data={getUniqueData()} />
                            <p>You've visited {getUniqueThisMonth()} unique restaurants this month!</p>
                        </div>
                    </Tab>
                    <Tab className="analytics-tab" eventKey="frequently-visited-restaurants" title="Frequently Visited Restaurants">
                        <div id="bar-div">
                            <Bar data={getFrequentData()} />
                            <p>{getFrequentRestaurantsSentance()}</p>
                        </div>
                    </Tab>
                </Tabs>
            </section>

        </React.Fragment>

    );
};

export default Analytics;
