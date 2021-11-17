import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import icon from '../../resources/times-circle-regular.svg';

import decoration from '../../resources/img/img.jpg';
import './modalWindow.scss';

export const ModalWindow = ({ active, setActive, onAdd }) => {
    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        thumb: decoration,
        ingridients: [],
        id: uuidv4()
    });
    const [ingridient, setIngridient] = useState('');
    const [lastIngridient, setLastIngridient] = useState(null);
    const [valid, setValid] = useState(true);

    useEffect(() => {
        if (lastIngridient) {
            onAdd(newDish);
            setEmptyNewDish();
        }
    }, [lastIngridient]);

    const setEmptyNewDish = () => {
        setNewDish({
            name: '',
            description: '',
            thumb: decoration,
            ingridients: [],
            id: uuidv4()
        });
    };

    const handleSendClick = e => {
        e.preventDefault();

        if (validateField(newDish.name) && validateField(newDish.description)) {
            succseecFullForm();
        } else {
            showErrorMassage();
        }
    };

    const validateField = string => {
        const reg = /[\w ,.!:?'-]{3,500}$/g;
        if (reg.test(string)) return true;
        return false;
    };

    const showErrorMassage = () => {
        setValid(false);
    };

    const succseecFullForm = () => {
        setActive(false);
        if (ingridient) {
            setNewDish(prev => {
                return {
                    ...prev,

                    ingridients: prev.ingridients.concat(ingridient)
                };
            });
            setLastIngridient(true);
            setIngridient('');
        } else {
            onAdd(newDish);
            setEmptyNewDish();
        }
        setValid(true);
    };
    const handleAddIngridient = () => {
        setNewDish(prev => {
            return {
                ...prev,

                ingridients: prev.ingridients.concat(ingridient)
            };
        });

        setIngridient('');
    };
    const onValueChange = e => {
        setNewDish(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const onIngridientChange = e => {
        setIngridient(e.target.value);
    };
    const title = valid ? (
        <h2>Add your own dish</h2>
    ) : (
        <h2>Your message should be no less than 3 symbols</h2>
    );

    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? 'modal__content active' : 'modal__content'}
                onClick={e => e.stopPropagation()}
            >
                {' '}
                <button
                    className="modal__close"
                    onClick={() => setActive(false)}
                >
                    <img
                        className="modal__close-icon modal-cancel"
                        src={icon}
                        alt="close modal window"
                    />
                </button>
                {title}
                <form className="form" action="url">
                    <input
                        value={newDish.name}
                        type="text"
                        placeholder="Enter name of the dish"
                        required
                        name="name"
                        onChange={onValueChange}
                    />

                    <div className="form__ingridient-wrapper">
                        <i
                            onClick={handleAddIngridient}
                            className="fas fa-plus form__icon"
                            alt="add more ingridients"
                        ></i>
                        <input
                            value={ingridient}
                            onChange={onIngridientChange}
                            className="dropdown__input"
                            type="text"
                            placeholder="Add an ingridient"
                            name="ingridient"
                            autoComplete="off"
                        />
                    </div>
                    <div className="form__textarea-wrepper">
                        <label htmlFor="txt">Description</label>
                        <textarea
                            value={newDish.description}
                            name="description"
                            id="txt"
                            cols="30"
                            rows="10"
                            onChange={onValueChange}
                        ></textarea>
                    </div>
                    <div className="form__button-wrapper">
                        <button
                            type="submit"
                            className="button button__secondary"
                            onClick={handleSendClick}
                        >
                            <div className="inner">Send</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
