import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setProductosCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + producto.cantidad }
                        : item
                );
            }
            return [...prev, producto];
        });
    };

    const borrarProductoCarrito = (id) => {
        setProductosCarrito((prev) => prev.filter((producto) => producto.id !== id));
    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    return (
        <CarritoContext.Provider
            value={{
                productosCarrito,
                agregarAlCarrito,
                borrarProductoCarrito,
                vaciarCarrito
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}