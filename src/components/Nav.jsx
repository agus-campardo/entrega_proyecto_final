import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { TfiShoppingCart } from "react-icons/tfi";
import { Offcanvas } from "bootstrap";
import Carrito from "./Carrito";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Nav.css";

function NavBar() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const offcanvasRef = useRef(null);
  const [offcanvasInstance, setOffcanvasInstance] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  useEffect(() => {
    let instance = null;

    if (offcanvasRef.current) {
      instance = new Offcanvas(offcanvasRef.current);
      setOffcanvasInstance(instance);
    }

    return () => {
      if (instance) {
        instance.dispose();
      }
    };
  }, []);

  const handleCarritoClick = () => {
    if (location.pathname !== "/carrito") {
      if (offcanvasInstance) {
        offcanvasInstance.show();
      }
    } else {
      navigate("/");
    }
    setExpanded(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const navItems = [
    { path: "/", name: "Inicio" },
    { path: "/productos", name: "Productos" },
    { path: "/nosotros", name: "Nosotros" }
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        className={`main-nav ${scrolled ? 'scrolled' : ''}`} 
        sticky="top"
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
        collapseOnSelect
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="nav-logo-container me-lg-3">
            <img
              src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/logo.jpg?raw=true"
              alt="Logo"
              className="nav-logo"
              style={{ objectFit: 'contain' }}
            />
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="border-0"
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="me-auto mb-2 mb-lg-0">
    {navItems.map((item) => (
      <Nav.Link 
        key={item.path}
        as={Link} 
        to={item.path} 
        className="nav-link px-lg-2"
        active={location.pathname === item.path}
        onClick={handleNavLinkClick}
      >
        {item.name}
      </Nav.Link>
    ))}

    {admin && (
      <Nav.Link 
        as={Link} 
        to="/admin" 
        className="nav-link px-lg-2"
        active={location.pathname === "/admin"}
        onClick={handleNavLinkClick}
      >
        Admin
      </Nav.Link>
    )}
  </Nav>

    {/* Acciones: Carrito + Login */}
    <div className="nav-actions">
        <Nav.Link 
            onClick={handleCarritoClick}
            className="nav-link cart-nav px-lg-2"
            style={{ cursor: "pointer" }}
        >
            <TfiShoppingCart className="cart-icon" />
            Carrito
            {user && productosCarrito.length > 0 && (
            <Badge pill bg="danger" className="ms-1">
                {productosCarrito.length}
            </Badge>
            )}
        </Nav.Link>

        <Nav.Link 
            as={Link} 
            to="/login" 
            className="login-link ms-2"
            onClick={handleNavLinkClick}
            style={{ padding: '0.5rem 1.5rem !important' }}
        >
            {user ? "Mi Cuenta" : "Login"}
        </Nav.Link>
    </div>
</Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas del carrito */}
      <div
        ref={offcanvasRef}
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Tu Carrito
          </h5>
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

export default NavBar;
