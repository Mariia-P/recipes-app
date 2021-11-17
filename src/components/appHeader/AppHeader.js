import { Link } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <span>Recipies</span> information app
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <Link to="/">Ramdom dish</Link>
                    </li>
                    /
                    <li>
                        <Link to="/favourites">Favourites</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
