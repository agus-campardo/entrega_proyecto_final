import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from 'sweetalert2';
import '../styles/FormularioEdicion.css';

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Sweet alert
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
    if (!admin) return; // 👈 nos aseguramos de no continuar si no hay admin
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if (error === "Producto no encontrado") {
        setError("Producto no encontrado");
        mostrarAlerta('error', 'Error', 'Producto no encontrado');
      }
      if (error === "Hubo un error al obtener el producto.") {
        setError("Hubo un error al obtener el producto.");
        mostrarAlerta('error', 'Error', 'Hubo un problema al cargar el producto');
      }
      setCargando(false);
    });
  }, [id, admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.image.trim()) {
      return "La URL de la imagen no debe estar vacía";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();

    if (validarForm === true) {
      editarProducto(producto).then(() => {
        mostrarAlerta('success', '¡Éxito!', 'Producto actualizado correctamente');
      }).catch((error) => {
        mostrarAlerta('error', 'Error', 'Hubo un problema al actualizar el producto: ' + error.message);
      });
    } else {
      mostrarAlerta('error', 'Error en el formulario', validarForm);
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  if (cargando) {
    return (
      <div className="formulario-edicion-container">
        <div className="cargando">Cargando producto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="formulario-edicion-container">
        <div className="error-mensaje">{error}</div>
        <Link to="/admin" className="boton-volver-panel">
          Volver al panel
        </Link>
      </div>
    );
  }

  return (
    <div className="formulario-edicion-container">
      <form className="formulario-edicion" onSubmit={handleSubmit}>
        <h2>Editar Producto</h2>

        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={producto.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="text"
            name="image"
            value={producto.image || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price || ''}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={producto.description || ''}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Actualizar Producto</button>

        <Link to="/admin" className="boton-volver-panel">
          Volver al panel
        </Link>
      </form>
    </div>
  );
}

export default FormularioEdicion;
