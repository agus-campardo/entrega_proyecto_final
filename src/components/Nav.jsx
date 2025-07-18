import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { TfiShoppingCart } from "react-icons/tfi";
import { Offcanvas } from "bootstrap";
import Carrito from "./Carrito";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Badge,
} from "react-bootstrap";
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
  };

  return (
    <>
      <Navbar expand="lg" className={`main-nav ${scrolled ? 'scrolled' : ''}`} sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="nav-logo-container">
            <img
              src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/logo.jpg?raw=true"
              alt="Logo"
              className="nav-logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-links me-auto">
              <Nav.Link as={Link} to="/" className="nav-link" active={location.pathname === "/"}>
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/productos" className="nav-link" active={location.pathname === "/productos"}>
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/nosotros" className="nav-link" active={location.pathname === "/nosotros"}>
                Nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="nav-link" active={location.pathname === "/contacto"}>
                Contacto
              </Nav.Link>

              {admin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown" className="nav-link">
                  <NavDropdown.Item as={Link} to="/admin" className="nav-link">
                    Panel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/agregarProductos" className="nav-link">
                    Agregar Productos
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            <Nav className="nav-links ms-auto align-items-center">
              <Button variant="link" onClick={handleCarritoClick} className="cart-container p-0 me-2">
                <TfiShoppingCart className="cart-icon" />
                {user && productosCarrito.length > 0 && (
                  <Badge pill bg="danger" className="cart-counter">
                    {productosCarrito.length}
                  </Badge>
                )}
              </Button>

              <Nav.Link as={Link} to="/login" className="login-link">
                {user ? "Mi Cuenta" : "Login"}
              </Nav.Link>
            </Nav>
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