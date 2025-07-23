import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import Swal from 'sweetalert2';
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

// Componenete ProductoDetalle: Permite agregar al carrito (usuarios normales) o editar/eliminar (admin)

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  // Estados del componenete
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);     // Cant seleccionada 
  const [cargando, setCargando] = useState(true);  // Estado de carga 
  const [error, setError] = useState(null);        // Manejo de errores 

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

  // Efecto para cargar el producto cuando camio el ID 
  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        // Manejo de errores 
        if (error == "Producto no encontrado") setError("Producto no encontrado");
        if (error == "Hubo un error al obtener el producto.") setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id]);

  // Función para agregar producto al carrito - Valida la cantidad y muestra alerta de éxito 
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
          navegar("/productos"); // Redirección después de eliminar 
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

  // Función para subir la cantidad 
  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  // Función para bajar la cantidad (mínimo 1)
  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <Container className="text-center py-5"><p>Cargando producto...</p></Container>;
  if (error) return <Container className="text-center py-5"><p>{error}</p></Container>;
  if (!productoEncontrado) return null;

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col lg={6} className="d-flex justify-content-center">
          <Image
            src={productoEncontrado.image}
            alt={productoEncontrado.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "contain" }}
            onError={(e) => e.target.src = 'https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/c-d-x-PDX_a_82obo-unsplash.jpg?raw=true'} // Para las imágenes que no se pueden ver 
          />
        </Col>

        {/* Información del producto */}
        <Col lg={6}>
          <div className="p-3 p-md-4">
            {/* Nombre del producto */}
            <h1 className="mb-3">{productoEncontrado.name}</h1>
            
            {/* Descripción del producto */}
            <p className="text-muted mb-4">{productoEncontrado.description}</p>
            
            {/* Precio del producto */}
            <h2 className="mb-4">${productoEncontrado.price}</h2>

            {/* Según tipo de usuario */}
            {!admin ? (
              /* Usuarios normales - Agregar al carrito */
              <div className="bg-light p-4 rounded">
                {/* Selector de cantidad */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Cantidad:</h5>
                  <div className="d-flex align-items-center">
                    <Button variant="outline-dark" onClick={restarContador} className="px-3">
                      -
                    </Button>
                    <span className="mx-3">{cantidad}</span>
                    <Button variant="outline-dark" onClick={sumarContador} className="px-3">
                      +
                    </Button>
                  </div>
                </div>
                {/* Botón para agregar al carrito */}
                <Button 
                  variant="dark" 
                  onClick={funcionCarrito}
                  className="w-100 py-3"
                >
                  Agregar al carrito
                </Button>
              </div>
            ) : (
              /* Para administradores - Editar/Eliminar */
              <div className="mt-4">
                <Link 
                  to={`/admin/editarProducto/${id}`} 
                  className="btn btn-outline-dark w-100 mb-3 py-3"
                >
                  Editar producto
                </Link>
                <Button 
                  variant="danger" 
                  onClick={dispararEliminar}
                  className="w-100 py-3"
                >
                  Eliminar producto
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductoDetalle;