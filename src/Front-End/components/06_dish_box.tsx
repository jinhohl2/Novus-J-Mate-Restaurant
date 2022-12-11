import React from 'react';

interface dishDataProps {
    dish_name: string,
    selectedDishFunc: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const DishChoice = (props: dishDataProps) => {
    function handleSectionClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        props.selectedDishFunc(e);
    }

    return (
        <section className="section-06-dish-box" onClick={handleSectionClick} key={props.dish_name + " block"} dish-group={props.dish_name}>
            <p dish-group={props.dish_name}>{props.dish_name}</p>
        </section>
    );
};

export default DishChoice;
