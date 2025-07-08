import "../styles/Main.css";

function Main() {
    return (
        <main className="main-container">
            {/* Sección Hero */}
            <section className="hero-section">
                <h2>Bienvenido a nuestra tienda</h2>
                <p>Descubre productos exclusivos con la mejor calidad</p>
            </section>

            {/* Sección de categorías */}
            <section className="categorias-section">
                <h3>Explora nuestras categorías</h3>
                <div className="categorias-grid">
                    <div className="categoria-card">
                        <h4>Electrónica</h4>
                        <p>Los mejores dispositivos tecnológicos</p>
                    </div>
                    <div className="categoria-card">
                        <h4>Hogar</h4>
                        <p>Todo para tu espacio</p>
                    </div>
                    <div className="categoria-card">
                        <h4>Moda</h4>
                        <p>Estilo y comodidad</p>
                    </div>
                </div>
            </section>

            {/* Sección de ofertas */}
            <section className="ofertas-section">
                <h3>Ofertas especiales</h3>
                <div className="ofertas-banner">
                    <p>¡Hasta 50% de descuento en seleccionados!</p>
                </div>
            </section>

            {/* Sección de testimonios */}
            <section className="testimonios-section">
                <h3>Lo que dicen nuestros clientes</h3>
                <div className="testimonio-card">
                    <p>"Excelente calidad y atención"</p>
                    <span>- María G.</span>
                </div>
            </section>
        </main>
    );
}

export default Main;