import React, { createContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {
    const { user } = useAuthContext();
    const [productosCarrito, setProductosCarrito] = useState([]);

    // Al iniciar sesión, cargamos el carrito correspondiente al usuario
    useEffect(() => {
        if (user) {
            const data = localStorage.getItem(`carrito_${user.email}`);
            if (data) {
                setProductosCarrito(JSON.parse(data));
            } else {
                setProductosCarrito([]);
            }
        } else {
            setProductosCarrito([]);
        }
    }, [user]);

    // Guardar el carrito en localStorage cada vez que cambia
    useEffect(() => {
        if (user) {
            localStorage.setItem(`carrito_${user.email}`, JSON.stringify(productosCarrito));
        }
    }, [productosCarrito, user]);

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id){
                    const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                    return productoActualizado
                } else {
                    return p;
                }
            });
            setProductosCarrito(carritoActualizado);
        } else {
            const nuevoCarrito = [...productosCarrito, producto];
            setProductosCarrito(nuevoCarrito);
        }
    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    function borrarProductoCarrito(id){
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
        setProductosCarrito(nuevoCarrito);
    }

    return (
        <CarritoContext.Provider value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}
