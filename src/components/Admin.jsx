import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import "../styles/Admin.css";

export default function Admin() {
    const { admin } = useAuthContext();
    const [showProductOptions, setShowProductOptions] = useState(false);

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    const toggleProductOptions = () => {
        setShowProductOptions(!showProductOptions);
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Panel de Administración</h1>
                <p>Bienvenido al área de gestión del sitio</p>
            </header>
            
            <div className="admin-dashboard">
                <div className="admin-card">
                    <h2>Usuarios</h2>
                    <p>Gestiona los usuarios registrados en el sistema</p>
                    <button className="admin-btn">Administrar</button>
                </div>
                
                <div className="admin-card">
                    <h2>Productos</h2>
                    <p>Agrega, edita o elimina productos del catálogo</p>
                    <button 
                        className="admin-btn" 
                        onClick={toggleProductOptions}
                        aria-expanded={showProductOptions}
                    >
                        Administrar
                    </button>
                    
                    {showProductOptions && (
                        <div className="product-options">
                            <Link to="agregarProductos" className="option-btn">
                                Agregar Producto
                            </Link>
                            <div className="option-message">
                                <p>Para editar productos, diríjase a la lista de productos generales y mediante la lupa, busque el producto que desea editar.</p>
                                <Link to="/productos" className="go-to-products">
                                    Ir a Productos
                                </Link>
                            </div>
                            <div className="option-message">
                                <p>Para eliminar productos, diríjase a la lista de productos generales y mediante la lupa, busque el producto que desea eliminar.</p>
                                <Link to="/productos" className="go-to-products">
                                    Ir a Productos
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="admin-card">
                    <h2>Pedidos</h2>
                    <p>Revisa y gestiona los pedidos realizados</p>
                    <button className="admin-btn">Administrar</button>
                </div>
                
                <div className="admin-card">
                    <h2>Estadísticas</h2>
                    <p>Visualiza métricas y datos importantes</p>
                    <button className="admin-btn">Ver reportes</button>
                </div>
            </div>
        </div>
    );
}