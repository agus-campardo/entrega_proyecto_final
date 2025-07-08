import "../styles/Carrito.css";

function CarritoCard({ producto, funcionDisparadora }) {
    return (
        <div className="carrito-card">
            <h3 className="carrito-producto">{producto.name}</h3>
            <p className="descripcion-carrito">{producto.description}</p>
            <img className="carrito-image" src={producto.image} alt={producto.name} />
            <span>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span>{producto.price} $</span>
            </div>
            <div className="carrito-sub">
                <span>{(producto.cantidad * producto.price).toFixed(2)} $</span>
            </div>
            <button 
                className="boton-carrito" 
                onClick={() => funcionDisparadora(producto.id)}
            >
                X
            </button>
        </div>
    );
}

export default CarritoCard;