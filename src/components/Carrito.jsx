import "../styles/Carrito.css";
import { useContext } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {
    const { user } = useAuthContext();
    const { productosCarrito, vaciarCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + (producto.price * producto.cantidad), 0
    );

    if (!user) {
        return (
            <div className="no-auth-message">
                <div className="no-auth-icon">🛒</div>
                <h3>¡Ups! Parece que no has iniciado sesión</h3>
                <p>Para acceder al carrito y disfrutar de tus compras, primero inicia sesión en tu cuenta.</p>
                <button 
                    className="no-auth-button"
                    onClick={() => window.location.href = '/login'}
                >
                    Iniciar sesión
                </button>
            </div>
        );
    }

    return (
        <div className="carrito-offcanvas">
            <div className="carrito-header">
                {productosCarrito.length > 0 && (
                    <button 
                        className="vaciar-carrito"
                        onClick={vaciarCarrito}
                        aria-label="Vaciar carrito"
                    >
                        Vaciar carrito
                    </button>
                )}
            </div>

            <div className="carrito-contenido">
                {productosCarrito.length > 0 ? (
                    <>
                        <div className="carrito-lista">
                            {productosCarrito.map((producto) => (
                                <CarritoCard 
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </div>
                        
                        <div className="carrito-resumen">
                            <div className="carrito-total-final">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className="boton-finalizar-compra">
                                Finalizar Compra
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="carrito-vacio-container">
                        <div className="carrito-vacio-icon">🛒</div>
                        <p className="carrito-vacio">Tu carrito está vacío</p>
                        <p className="carrito-vacio-sub">Agrega productos para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
}