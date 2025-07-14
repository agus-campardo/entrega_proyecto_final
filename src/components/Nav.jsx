import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { TfiShoppingCart } from "react-icons/tfi";
import "../styles/Nav.css";

function Nav() {
    const { productosCarrito } = useContext(CarritoContext);
    const { user, admin } = useAuthContext();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return ( 
        <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
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
                <li>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Inicio
                    </Link>
                </li>  
                <li>
                    <Link to="/productos" className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`}>
                        Productos
                    </Link>
                </li>   
                <li>
                    <Link to="/nosotros" className={`nav-link ${location.pathname === '/nosotros' ? 'active' : ''}`}>
                        Nosotros
                    </Link>
                </li>  
                <li>
                    <Link to="/contacto" className={`nav-link ${location.pathname === '/contacto' ? 'active' : ''}`}>
                        Contacto
                    </Link>
                </li>  
                <li>
                    <Link to="/carrito" className={`nav-link ${location.pathname === '/carrito' ? 'active' : ''}`}>
                        <div className="cart-container">
                            <TfiShoppingCart className="cart-icon" />
                            {user && productosCarrito.length > 0 && (
                                <span className="cart-counter">{productosCarrito.length}</span>
                            )}
                        </div>
                    </Link>
                </li> 
                {admin && (
                    <>
                        <li>
                            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                                Admin
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/agregarProductos" className={`nav-link ${location.pathname.startsWith('/admin/agregarProductos') ? 'active' : ''}`}>
                                Agregar productos
                            </Link>
                        </li>
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