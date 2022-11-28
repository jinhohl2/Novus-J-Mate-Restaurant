import React from 'react';
import { useState } from "react";

interface CuisineDataProps {
    img_src: string,
    cuisine_type: string,
    selectedDishFunc: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const CuisineChoice = (props: CuisineDataProps) => {
    const [backgroundColor, setbackgroundColor] = useState<string>("#ff3535");

    function handleSectionClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        props.selectedDishFunc(e);
        if (backgroundColor === "#ff3535") {
            setbackgroundColor("#E8CB0A");
        } else {
            setbackgroundColor("#ff3535");
        }
    }

    return (
        <section className="section-05-cuisine-box" onClick={handleSectionClick} key={props.cuisine_type + " image block"} cuisine-group={props.cuisine_type} style={{backgroundColor: backgroundColor}}>
            <img src={process.env.PUBLIC_URL + props.img_src} alt={"Sample of " + props.cuisine_type + " food."} cuisine-group={props.cuisine_type}></img>
            <p cuisine-group={props.cuisine_type}>{props.cuisine_type}</p>
        </section>
    );
};

export default CuisineChoice;
