import { useState, useEffect } from 'react';
import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RandomDish from '../randomDish/RandomDish';
import DishList from '../dishList/DishList';
import DishInfo from '../dishInfo/DishInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AddDishButton from '../addDishButton/AddDishButton';
import { ModalWindow } from '../modalWindow/ModalWindow';

import '../randomDish/randomDish.scss';

const App = () => {
    let savedFavourite =
        localStorage.getItem('favourite') !== null
            ? JSON.parse(localStorage.getItem('favourite'))
            : [];

    const [selectedRecipie, setselectedRecipie] = useState([]);
    const [favouriteDishes, setfavouriteDishes] = useState(savedFavourite);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        localStorage.setItem('favourite', JSON.stringify(favouriteDishes));
    }, [favouriteDishes]);

    const onDishSelected = id => {
        setselectedRecipie(() => favouriteDishes.filter(el => el.id === id));
    };

    const addDish = ({ name, description, thumb, ingridients, id }) => {
        const newItem = [
            {
                name,
                description,
                thumb,
                ingridients,
                id
            }
        ];

        setfavouriteDishes(prevDish => [...prevDish, ...newItem]);
    };
    const deleteDish = id => {
        setfavouriteDishes(prevDish => prevDish.filter(el => el.id !== id));
    };

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route
                            path="/favourites"
                            element={
                                <div className="dish__content">
                                    <ErrorBoundary>
                                        <DishList
                                            dishes={favouriteDishes}
                                            onDelete={deleteDish}
                                            onDishSelected={onDishSelected}
                                        />
                                    </ErrorBoundary>

                                    <ErrorBoundary>
                                        <DishInfo dish={selectedRecipie} />
                                    </ErrorBoundary>
                                    <AddDishButton setActive={setModalActive} />
                                    <ModalWindow
                                        active={modalActive}
                                        setActive={setModalActive}
                                        onAdd={addDish}
                                    ></ModalWindow>
                                </div>
                            }
                        />
                        <Route
                            path="*"
                            exact
                            element={
                                <div className="recipie__content">
                                    <ErrorBoundary>
                                        <RandomDish onAdd={addDish} />
                                    </ErrorBoundary>
                                </div>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
