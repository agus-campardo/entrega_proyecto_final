import "../styles/Carrito.css";
import { useContext } from "react";
import CarritoCard from "./CarritoCard";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {
    const {user} = useAuthContext();
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    );

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="carrito-conteiner">
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
            <div className="carrito-titulos">
                <h2 className="carrito-titulo-producto">Producto</h2>
                <h2 className="carrito-titulo-descripcion">Descripción</h2>
                <h2> </h2>
                <h2>Cantidad</h2>
                <h2>Precio unitario</h2>
                <h2>Sub total</h2>
                <h2> </h2>
            </div>
            {productosCarrito.length > 0 ? (
                productosCarrito.map((producto) => (
                    <CarritoCard
                        key={producto.id}
                        producto={producto}
                        funcionDisparadora={borrarProductoCarrito}
                    />
                ))
            ) : (
                <p>Carrito vacío</p>
            )}
            {total > 0 && <span>Total a pagar: {total.toFixed(2)} $</span>}
        </div>
    );
}