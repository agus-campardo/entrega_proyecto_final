import "../styles/Carrito.css";

function CarritoCard({ producto, onDelete }) {
    const precio = typeof producto.price === 'number' ? producto.price : parseFloat(producto.price);
    const subtotal = precio * (producto.cantidad || 1);

    return (
        <div className="carrito-card">
            <div className="carrito-image-container">
                <img 
                    className="carrito-image" 
                    src={producto.image} 
                    alt={producto.name}
                    onError={(e) => e.target.src = 'https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/c-d-x-PDX_a_82obo-unsplash.jpg?raw=true'}
                />
            </div>
            
            <div className="carrito-card-content">
                <div className="carrito-card-header">
                    <h3 className="carrito-producto">{producto.name}</h3>
                    <button 
                        className="carrito-remove-btn"
                        onClick={() => onDelete(producto.id)}
                        aria-label="Eliminar producto"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="carrito-card-footer">
                    <div className="cantidad-control">
                        <span className="cantidad-label">Cantidad:</span>
                        <span className="cantidad-value">{producto.cantidad || 1}</span>
                    </div>
                    
                    <div className="precio-info">
                        <span className="precio-unitario">{precio.toFixed(2)} $</span>
                        <span className="precio-total">{subtotal.toFixed(2)} $</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarritoCard;