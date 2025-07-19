import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import Swal from 'sweetalert2';
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

  // Para las alertas
  const mostrarAlerta = (icono, titulo, texto) => {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      background: 'white',
      color: '#3a0c0c',
      confirmButtonColor: '#3a0c0c',
      confirmButtonText: 'Entendido',
      customClass: {
        title: 'swal-title-custom',
        confirmButton: 'swal-button-custom',
        container: 'swal-container-custom'
      }
    });
  };

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
    mostrarAlerta("success", "Producto Agregado", "El producto fue agregado al carrito con éxito");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

function dispararEliminar() {
  Swal.fire({
    title: '¿Eliminar producto?',
    text: "¡Esta acción no se puede deshacer!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3a0c0c',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: 'white',
    customClass: {
      title: 'swal-title-custom',
      confirmButton: 'swal-button-custom',
      cancelButton: 'swal-cancel-button-custom',
      container: 'swal-container-custom'
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await eliminarProducto(id);
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonColor: '#3a0c0c',
          background: 'white',
          customClass: {
            title: 'swal-title-custom',
            confirmButton: 'swal-button-custom',
            container: 'swal-container-custom'
          }
        });
        navegar("/productos");
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar el producto: ' + error.message,
          icon: 'error',
          confirmButtonColor: '#3a0c0c',
          background: 'white',
          customClass: {
            title: 'swal-title-custom',
            confirmButton: 'swal-button-custom',
            container: 'swal-container-custom'
          }
        });
      }
    }
  });
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
            {!admin && (
              <div className="detalle-contador">
                <button onClick={restarContador}>-</button>
                <span>{cantidad}</span>
                <button onClick={sumarContador}>+</button>
              </div>
            )}
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