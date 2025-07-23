import { Link } from "react-router-dom";
import "../styles/Productos.css";

function Card({ producto }) { 
    return (
        <div className="producto-card">
            <h2 style={{ color: "black" }}>{producto.name}</h2>

            <Link to={"/productos/" + producto.id}>
                <img 
                    className="producto-image" 
                    src={producto.image} 
                    alt={producto.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/c-d-x-PDX_a_82obo-unsplash.jpg?raw=true";
                    }}
                />
            </Link>

            <p>{producto.price} $</p>

            <Link to={"/productos/" + producto.id}>
                <button className="add-to-cart">Ver detalle del producto</button>
            </Link>
        </div>
    );
}

export default Card;
