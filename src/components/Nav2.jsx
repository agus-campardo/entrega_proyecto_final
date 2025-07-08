import { Link } from 'react-router-dom';
import "../styles/Nav.css";

function Nav2() {  
    return (  
        <nav className="main-nav">  
            <ul className="nav-links">  
                <li><Link to="/">Inicio</Link></li>  
                <li><Link to="/productos">Acerca de</Link></li>  
                <li><Link to="/contacto">Contacto</Link></li>  
            </ul>  
        </nav>
    );  
}

export default Nav2;