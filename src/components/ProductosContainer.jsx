import { useEffect, useState } from "react"
import "../styles/Productos.css"
import { useProductosContext } from "../contexts/ProductosContext"
import { useAuthContext } from "../contexts/AuthContext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./Card"
import { FaSearch } from "react-icons/fa";

function ProductosContainer({}){
    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);

    useEffect(() => {
        filtrarProductos(filtro)
    },[filtro])

    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return <p>Cargando productos...</p>;
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return(
            <div className="productos-contenedor">
                <Helmet>
                    <title>Productos | Mi Tienda</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>
                
                {/* Barra de búsqueda */}
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                {/* Lista de productos */}
                <Row xs={1} md={2} lg={4} className="g-4">
                    {productosActuales.length > 0 ? 
                        productosActuales.map((producto) => (
                            <Col key={producto.id}>
                                <CardProducto producto={producto} />
                            </Col>
                        ))
                    : <p className="text-center w-100">No se encontraron productos</p>}
                </Row>

                {/* Paginación */}
                <div className="pagination-container">
                    {/* Flecha izquierda */}
                    <button 
                        className="pagination-btn" 
                        onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                        disabled={paginaActual === 1}
                        aria-label="Página anterior"
                    >
                        &lt;
                    </button>

                    {/* Números de página */}
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-btn ${paginaActual === index + 1 ? "active" : ""}`}
                            onClick={() => cambiarPagina(index + 1)}
                            aria-label={`Ir a página ${index + 1}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Flecha derecha */}
                    <button 
                        className="pagination-btn" 
                        onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                        disabled={paginaActual === totalPaginas}
                        aria-label="Página siguiente"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        )
    }
}

export default ProductosContainer