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
                <h3>Maximum distance from your location (miles)</h3>
                <input type="range" min="0" max="70" step="5" list="ticks" value={distance} onChange={updateDistance}/>
            </div>
            <datalist id="ticks">
                <option value="0" label="0"></option>
                <option value="10" label="10"></option>
                <option value="20" label="20"></option>
                <option value="30" label="30"></option>
                <option value="40" label="40"></option>
                <option value="50" label="50"></option>
                <option value="60" label="60"></option>
                <option value="70" label="70"></option>
            </datalist>
        </section>
    );
};

export default DistanceToLocationComponent;
