import { useState } from 'react';

import './dishView.scss';
import decoration from '../../resources/img/img.jpg';

const DishView = ({ dish }) => {
    const { name, description, thumb, ingridients, moreDescription } = dish;
    const [btnText, setBtnText] = useState('Read More');

    const hendleReadBtnClick = () => {
        setBtnText(prevText =>
            prevText === 'Read More' ? 'Read Less' : 'Read More'
        );
    };

    const readMoreButton = moreDescription ? (
        <button
            onClick={hendleReadBtnClick}
            className="randomdish__button-more"
        >
            {btnText}
        </button>
    ) : null;
    
    const imgUrl = thumb ? thumb : decoration;
    const ingridientsList = ingridients.map((el, idx) => {
        // const { ingridient, meshure } = el;
        const itemInfo = ` ${idx + 1} ${el} `;
        return (
            <li key={idx} className="randomdish__ingridient-item">
                {itemInfo}
            </li>
        );
    });

    const validDescription =
        btnText === 'Read More'
            ? description
            : `${description} +' '+ ${moreDescription}`;
    return (
        <>
            <div className="randomdish__top-wrapper">
                <img
                    src={imgUrl}
                    alt="image of dish"
                    className="randomdish__img"
                />
                <ul className="randomdish__ingridient-list">
                    {ingridientsList}
                </ul>
            </div>

            <div className="randomdish__info">
                <h2>{name}</h2>
                <p>{validDescription}</p>
                {readMoreButton}
            </div>
        </>
    );
};

export default DishView;
