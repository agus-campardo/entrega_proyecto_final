import { Link } from "react-router-dom";
import "../styles/Productos.css";

function Card({ producto, agregarAlCarrito }) {
    return (
        <div className="producto-card">
            <h2>{producto.name}</h2>
            <Link to={`/productos/${producto.id}`}>
                <img className="producto-image" src={producto.image} alt={producto.name} />
            </Link>
            <p className="price">{producto.price} $</p>
            <button 
                className="add-to-cart"
                onClick={() => agregarAlCarrito({...producto, cantidad: 1})}
            >
                Agregar al carrito
            </button>
            <Link to={`/productos/${producto.id}`}>
                <button className="ver-detalle">Ver detalles</button>
            </Link>
        </div>
    );
}

export default Card;