import { Link } from "react-router-dom";
import "../styles/Productos.css";

function Card({ producto }) { // Eliminé el prop 'agregarAlCarrito' ya que no se usará
    return (
        <div className="producto-card">
            <h2 style={{ color: "black" }}>{producto.name}</h2>

            <Link to={"/productos/" + producto.id}>
                <img 
                    className="producto-image" 
                    src={producto.image} 
                    alt={producto.name} 
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