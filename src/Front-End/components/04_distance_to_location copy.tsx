import React from 'react';
import { useState } from "react";

const DistanceToLocationComponent = () => {
    const [distance, setDistance] = useState<number>(100);

    function updateDistance(event: React.ChangeEvent<HTMLInputElement>): void {
        setDistance(event.target.valueAsNumber);
    }

    return (
        <section className="section-04-distance-to-location-repeating-components">
            <div id="distance-to-location-container">
                <h3>Maximum distance from your location</h3>
                <input type="range" min="0" max="100" step="5" list="ticks" value={distance} onChange={updateDistance}/>
            </div>
            <datalist id="ticks">
                <option value="0" label="0"></option>
                <option value="5"></option>
                <option value="10" label="10"></option>
                <option value="15"></option>
                <option value="20" label="20"></option>
                <option value="25"></option>
                <option value="30" label="30"></option>
                <option value="35"></option>
                <option value="40" label="40"></option>
                <option value="45"></option>
                <option value="50" label="50"></option>
                <option value="55"></option>
                <option value="60" label="60"></option>
                <option value="65"></option>
                <option value="70" label="70"></option>
                <option value="75"></option>
                <option value="80" label="80"></option>
                <option value="85"></option>
                <option value="90" label="90"></option>
                <option value="95"></option>
                <option value="100" label="100"></option>
            </datalist>
        </section>
    );
};

export default DistanceToLocationComponent;
