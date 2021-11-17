import Skeleton from '../skeleton/Skeleton';

import './dishInfo.scss';

const DishInfo = props => {
    const { dish } = props;
    const skeleton = dish.length > 0 ? null : <Skeleton />;
    const content = dish.length > 0 ? <View dish={dish} /> : null;

    return (
        <div className="dish__info">
            {skeleton}

            {content}
        </div>
    );
};

const View = dish => {
    const { name, description, moreDescription, thumb, ingridients } =
        dish.dish[0];

    return (
        <>
            <div className="dish__basics">
                <img src={thumb} alt={name} />
                <div>
                    <div className="dish__info-name">{name}</div>
                </div>
            </div>
            <div className="dish__descr">
                {description}
                {moreDescription}
            </div>
            <div className="dish__comics">Ingridients:</div>
            <ul className="dish__comics-list">
                {ingridients.length > 0 ? (
                    ingridients.map((item, idx) => {
                        return (
                            <li key={idx} className="dish__comics-item">
                                {idx + 1} {item}
                            </li>
                        );
                    })
                ) : (
                    <p>There are no ingridients in this recipe</p>
                )}
            </ul>
        </>
    );
};

export default DishInfo;
