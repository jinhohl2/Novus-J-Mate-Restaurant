import React from 'react';
import { useState } from "react";

interface CuisineDataProps {
    img_src: string,
    cuisine_type: string
}


const CuisineChoice = (props: CuisineDataProps) => {
    const [selectedDish, setSelectedDish] = useState<string>("cuisine");

    function updateSelectedDish() {
        setSelectedDish(selectedDish);
    }

    return (
        <section className="section-05-cuisine-box" onClick={updateSelectedDish}>
            <img src={process.env.PUBLIC_URL + props.img_src} alt={"Sample of " + props.cuisine_type + " food."}></img>
            <p>{props.cuisine_type}</p>
        </section>
    );
};

export default CuisineChoice;
