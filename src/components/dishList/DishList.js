import { useState, useEffect } from 'react';

import DishItem from '../dishItem/DishItem';

import './dishList.scss';

const DishList = ({ dishes, onDelete, onDishSelected }) => {
    const [activeCountOfPostSets, setactiveCountOfPostSets] = useState(1);
    const [items, setItems] = useState([]);
    const amountItemsInSet = 3;
    
    useEffect(() => {
        const newItems = dishes.slice(
            (activeCountOfPostSets - 1) * amountItemsInSet,
            (activeCountOfPostSets - 1) * amountItemsInSet + amountItemsInSet
        );
        setItems(prevItems => [...prevItems, ...newItems]);
    }, [activeCountOfPostSets]);

    useEffect(() => {
        const newItems = dishes.slice(
            0,
            (activeCountOfPostSets - 1) * amountItemsInSet + amountItemsInSet
        );
        setItems([...newItems]);
    }, [dishes]);

    const showMore = () => {
        setactiveCountOfPostSets(prevValue => prevValue + 1);
    };
    const elements = items.map(({ name, thumb, id }) => {
        return (
            <DishItem
                key={id}
                name={name}
                thumb={thumb}
                onDishSelected={() => onDishSelected(id)}
                onDelete={() => onDelete(id)}
            />
        );
    });

    const ReadMoreButton = () => (
        <button className="button button__main button__long" onClick={showMore}>
            <div className="inner">Show more</div>
        </button>
    );

    const Content = () => (
        <>
            <ul className="dish__grid">{elements}</ul>
            {dishes.length > activeCountOfPostSets * 3 ? (
                <ReadMoreButton />
            ) : null}
        </>
    );
    const noContent =
        dishes.length > 0 ? null : (
            <p className="dish__list-empty">There are no recipes yet</p>
        );

    return (
        <div className="dish__list">{noContent ? noContent : <Content />}</div>
    );
};

export default DishList;
