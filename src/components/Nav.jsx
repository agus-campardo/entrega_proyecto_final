import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { TfiShoppingCart } from "react-icons/tfi";
import { Offcanvas } from "bootstrap";
import Carrito from "./Carrito";
import "../styles/Nav.css";

function Nav() {
    const { productosCarrito } = useContext(CarritoContext);
    const { user, admin } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const offcanvasRef = useRef(null);
    const [offcanvasInstance, setOffcanvasInstance] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Inicializar el offcanvas cuando el componente se monta
        if (offcanvasRef.current) {
            setOffcanvasInstance(new Offcanvas(offcanvasRef.current));
        }

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
            // Limpiar la instancia del offcanvas al desmontar
            if (offcanvasInstance) {
                offcanvasInstance.dispose();
            }
        };
    }, [scrolled]);

    const handleCarritoClick = () => {
        if (location.pathname !== '/carrito') {
            // Mostrar el offcanvas usando la instancia guardada
            if (offcanvasInstance) {
                offcanvasInstance.show();
            }
        } else {
            // Si ya estamos en la ruta /carrito, redirigir a home
            navigate('/');
        }
    };

    return ( 
        <>
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
                        <button 
                            className={`nav-link ${location.pathname === '/carrito' ? 'active' : ''}`} 
                            onClick={handleCarritoClick}
                            style={{background: 'none', border: 'none', cursor: 'pointer'}}
                        >
                            <div className="cart-container">
                                <TfiShoppingCart className="cart-icon" />
                                {user && productosCarrito.length > 0 && (
                                    <span className="cart-counter">{productosCarrito.length}</span>
                                )}
                            </div>
                        </button>
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

            {/* Offcanvas para el carrito */}
            <div 
                ref={offcanvasRef}
                className="offcanvas offcanvas-end" 
                tabIndex="-1" 
                id="offcanvasRight" 
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Tu Carrito</h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="offcanvas" 
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <Carrito />
                </div>
            </div>
        </>
    );  
}

export default Nav;