import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import "../styles/Nav.css";

function Nav() {
    const { productosCarrito } = useContext(CarritoContext);
    const { user, admin } = useAuthContext();
    
    return ( 
        <nav className="main-nav">
            <div className="nav-logo-container">
                <Link to="/">
                    <img 
                        src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/logo.jpg?raw=true" 
                        alt="Logo" 
                        className="nav-logo"
                    />
                </Link>
            </div>
            
            <ul className="nav-links">  
                <li><Link to="/" className="nav-link">Inicio</Link></li>  
                <li><Link to="/productos" className="nav-link">Productos</Link></li>   
                <li><Link to="/nosotros" className="nav-link">Nosotros</Link></li>  
                <li><Link to="/contacto" className="nav-link">Contacto</Link></li>  
                <li>
                    <Link to="/carrito" className="nav-link">
                        Carrito
                        {user && productosCarrito.length > 0 && (
                            <span className="cart-counter">{productosCarrito.length}</span>
                        )}
                    </Link>
                </li> 
                {admin && (
                    <>
                        <li><Link to="/admin" className="nav-link">Admin</Link></li>
                        <li><Link to="/admin/agregarProductos" className="nav-link">Agregar productos</Link></li>
                    </>
                )}
                <li>
                    <Link to="/login" className="login-link">
                        {user ? 'Mi Cuenta' : 'Login'}
                    </Link>
                </li>
            </ul>
        </nav>
    );  
}

export default Nav;