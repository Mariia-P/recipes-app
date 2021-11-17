import './dishItem.scss';

const DishItem = props => {
   
const { name, id, onDishSelected, thumb, onDelete } = props;
const cuttedName= name.slice(0, 15);

        return (
            <li key={id} className="dish__item" tabIndex="0">
                <img src={thumb} alt={name} onClick={onDishSelected} />
                <div className="dish__info-wrapper">
                    <div className="dish__name">{cuttedName}...</div>
                    <button
                        type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        );
   
};
export default DishItem;
