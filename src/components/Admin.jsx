import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/Admin.css";

export default function Admin() {
    const { admin } = useAuthContext();
    const [showProductOptions, setShowProductOptions] = useState(false);

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Container fluid className="admin-container px-md-5">
            <Row className="justify-content-center">
                <Col xs={12} lg={10} xl={8}>
                    <Card className="admin-header mb-4 border-0 shadow-sm">
                        <Card.Body className="text-center py-4">
                            <h1 className="display-5 fw-bold mb-3">Panel de Administración</h1>
                            <p className="lead text-muted">Bienvenido al área de gestión del sitio</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="justify-content-center g-4">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <Card className="admin-card h-100 border-0 shadow-sm">
                        <Card.Body className="d-flex flex-column">
                            <h2 className="h3 fw-bold mb-3">Productos</h2>
                            <p className="text-muted mb-4 flex-grow-1">
                                Agrega, edita o elimina productos del catálogo
                            </p>
                            
                            <Button 
                                variant="primary" 
                                size="lg"
                                className="admin-btn mb-3"
                                onClick={() => setShowProductOptions(!showProductOptions)}
                            >
                                {showProductOptions ? 'Ocultar opciones' : 'Administrar productos'}
                            </Button>
                            
                            {showProductOptions && (
                                <div className="card-options mt-3">
                                    <Link 
                                        to="agregarProductos" 
                                        className="option-btn btn btn-dark btn-lg w-100 mb-3"
                                    >
                                        Agregar Producto
                                    </Link>
                                    
                                    <div className="option-message p-3 mb-3 bg-light rounded">
                                        <p className="mb-3">
                                            Para editar productos (actualizar o eliminar), diríjase a la lista de productos generales.
                                        </p>
                                        <Link 
                                            to="/productos" 
                                            className="go-to-products btn btn-outline-dark w-100"
                                        >
                                            Ir a Productos
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}