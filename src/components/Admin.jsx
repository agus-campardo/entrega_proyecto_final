import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Card, Button, Container } from "react-bootstrap";
import "../styles/Admin.css";

export default function Admin() {
    const { admin } = useAuthContext();
    const [showProductOptions, setShowProductOptions] = useState(false);

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Container className="admin-container">
            <Card className="admin-header mb-4">
                <Card.Body className="text-center">
                    <h1>Panel de Administración</h1>
                    <p>Bienvenido al área de gestión del sitio</p>
                </Card.Body>
            </Card>
            
            <div className="admin-dashboard">
                {/* Solo el panel de productos */}
                <Card className="admin-card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <Card.Body>
                        <h2>Productos</h2>
                        <p>Agrega, edita o elimina productos del catálogo</p>
                        <Button 
                            variant="primary" 
                            className="admin-btn w-100"
                            onClick={() => setShowProductOptions(!showProductOptions)}
                        >
                            {showProductOptions ? 'Ocultar' : 'Administrar'}
                        </Button>
                    </Card.Body>
                    
                    {showProductOptions && (
                        <Card.Body className="card-options">
                            <Link to="agregar-productos" className="option-btn d-block mb-3">
                                Agregar Producto
                            </Link>
                            <div className="option-message mb-3">
                                <p>Para editar productos (actualizar o eliminar), diríjase a la lista de productos generales.</p>
                                <Link to="/productos" className="go-to-products">
                                    Ir a Productos
                                </Link>
                            </div>
                        </Card.Body>
                    )}
                </Card>
            </div>
        </Container>
    );
}