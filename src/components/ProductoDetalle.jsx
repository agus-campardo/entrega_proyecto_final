import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error == "Producto no encontrado") setError("Producto no encontrado");
        if (error == "Hubo un error al obtener el producto.") setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((error) => dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar"));
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-image" src={productoEncontrado.image} alt={productoEncontrado.name} />
      <div className="detalle-info">
        <div>
          <h2>{productoEncontrado.name}</h2>
          <p>{productoEncontrado.description}</p>
          <p className="price">{productoEncontrado.price} $</p>
          
          <div className="contador-carrito-group">
            {/* SOLO aparece si NO es admin */}
            {!admin && (
              <div className="detalle-contador">
                <button onClick={restarContador}>-</button>
                <span>{cantidad}</span>
                <button onClick={sumarContador}>+</button>
              </div>
            )}
            {/* El botón ya está condicionado por !admin, así que no tocar */}
            {!admin && (
              <button className="btn-agregar" onClick={funcionCarrito}>
                Agregar al carrito
              </button>
            )}
          </div>
        </div>

        {admin && (
          <div className="detalle-actions">
            <Link to={"/admin/editarProducto/" + id} className="btn-action btn-editar">
              Editar producto
            </Link>
            <button className="btn-action btn-eliminar" onClick={dispararEliminar}>
              Eliminar Producto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalle;