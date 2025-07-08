import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import "../styles/Nav.css";
import { useAuthContext } from "../contexts/AuthContext";

function Nav() {
    const { productosCarrito } = useContext(CarritoContext);
    const { user } = useAuthContext();
    
    return ( 
        <nav className="main-nav">  
            <ul className="nav-links">  
                <li><Link to="/">Inicio</Link></li>  
                <li><Link to="/productos">Productos</Link></li>   
                <li><Link to="/nosotros">Nosotros</Link></li>  
                <li><Link to="/contacto">Contacto</Link></li>  
                <li>
                    <Link to="/carrito">
                        Carrito 
                        {productosCarrito.length > 0 && (
                            <span className="user-logged-in">
                                {productosCarrito.length}
                            </span>
                        )}
                    </Link>
                </li> 
                {user && <li><Link to="/admin">Admin</Link></li>}
                <li>
                    <Link to="/login" className="login-link">
                        Login
                    </Link>
                </li>
                {user && <li><Link to="/admin/agregarProductos">Agregar productos</Link></li>} 
            </ul>
        </nav>
    );  
}

export default Nav;