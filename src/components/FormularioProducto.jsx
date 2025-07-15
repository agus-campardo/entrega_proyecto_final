import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import '../styles/FormularioProducto.css';

function FormularioProducto({}) {
  const {agregarProducto} = useProductosContext();
  const {admin} = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    image: ""
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return("El nombre es obligatorio.")
    }
    if (!producto.price || producto.price <= 0) {
      return("El precio debe ser mayor a 0.")
    }
    console.log(producto.description.trim())
    if (!producto.description.trim() || producto.description.length < 10) {
      return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.image.trim()){
      return("La url de la imgaen no debe estar vacía")
    }
    else{
      return true
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
    if (validarForm == true) {
      agregarProducto(producto).then((data) => {
        setProducto({ name: '', price: '', description: '', image: ""});
      }).catch((error) => {
        dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
      })
    } else{
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
    }
  }

  if(!admin){
    return(
      <Navigate to="/login" replace/>
    )
  }

  return ( 
    <div className="formulario-producto-container">
      <form onSubmit={handleSubmit2} className="formulario-producto">
        <h2>Agregar Producto</h2>
        <p className="subtitle">Completá todos los campos para añadir un nuevo producto</p>
        
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text" 
            name="name" 
            value={producto.name} 
            onChange={handleChange} 
            placeholder="Ej: Café"
            required
          />
        </div>
        
        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="text" 
            name="image" 
            value={producto.image} 
            onChange={handleChange} 
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Precio (ARS):</label>
          <input 
            type="number" 
            name="price" 
            value={producto.price} 
            onChange={handleChange} 
            placeholder="Ej: 1200"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={producto.description}
            onChange={handleChange}
            placeholder="Describe el producto con al menos 10 caracteres..."
            required
          />
        </div>
        
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default FormularioProducto;