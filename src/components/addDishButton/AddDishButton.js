import './addDishButton.scss';

const AddDishButton = ({ setActive }) => {
    return (
        <button
            className="addDishButton"
            onClick={() => {
                return setActive(true);
            }}
        >
            ADD
        </button>
    );
};

export default AddDishButton;
