import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productos.css";
import Card from "./Card";
import { CarritoContext } from "../contexts/CarritoContext";

function ProductosContainer1() {
    const { id } = useParams();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        fetch('https://683267eec3f2222a8cb23943.mockapi.io/PRODUCTOS')
            .then((res) => res.json())
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error);
                setError('Hubo un error al cargar los productos.');
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>;
    } else if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="productos-conteiner">
            {productos.map((producto) => (
                <Card
                    key={producto.id}
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                />
            ))}
        </div>
    );
}

export default ProductosContainer1;