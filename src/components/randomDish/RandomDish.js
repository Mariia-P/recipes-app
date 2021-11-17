import { Component } from 'react';

import DishView from '../dishView/DishView';
import Spinner from '../spinner/Spinner';
import RecipesService from '../../services/RecipesService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

import './randomDish.scss';

class RandomDish extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dish: {},
            loading: true,
            error: false,
            newItemLoading: false,
            isLike: false
        };

        this.handleClick = () => {
            if (this.state.isLike) {
                return;
            }
            this.setState({
                isLike: true
            });
            this.props.onAdd(this.state.dish);
        };
    }

    recipiesService = new RecipesService();

    componentDidMount() {
        this.updateDish();
    }
    onDishLoading = () => {
        this.setState({
            newItemLoading: true
        });
    };

    onDishLoaded = dish => {
        this.setState({
            dish,
            loading: false,
            newItemLoading: false,
            isLike: false
        });
    };

    onError = e => {
        console.log('[e]', e);
        this.setState({ loading: false, error: true });
    };

    updateDish = () => {
        this.onDishLoading();
        this.setState({ loading: true });

        this.recipiesService
            .getRecipe()
            .then(this.onDishLoaded)
            .catch(this.onError);
    };

    render() {
        const { dish, loading, error, newItemLoading, isLike } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? (
            <div className="randomdish__spinner-wrapper">
                <Spinner />
            </div>
        ) : null;
        const content = !(loading || error) ? <DishView dish={dish} /> : null;
        const likedDishStyle = isLike
            ? 'randomdish randomdish__shadow-red'
            : 'randomdish';

        return (
            <div className={likedDishStyle}>
                {errorMessage}
                {spinner}
                {content}
                <div className="randomdish__btns">
                    <button
                        type="submit"
                        onClick={this.handleClick}
                        className="button button__main"
                    >
                        <div className="inner">Like</div>
                    </button>
                    <button
                        disabled={newItemLoading}
                        onClick={this.updateDish}
                        className="button button__secondary"
                    >
                        <div className="inner">Next</div>
                    </button>
                </div>
            </div>
        );
    }
}

export default RandomDish;
