import { Carousel } from 'react-bootstrap';
import "../styles/Main.css";

function Main() {
    return (
        <main className="main-container">
            {/* Carrusel Hero */}
            <section className="hero-carousel mb-4">
                <Carousel controls indicators>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/carrusel1.jpg?raw=true"
                            alt="Primer slide"
                        />
                        <Carousel.Caption>
                            <h3>Bienvenido a nuestra tienda</h3>
                            <p>Descubre productos exclusivos con la mejor calidad</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/carrusel2.jpg?raw=true"
                            alt="Segundo slide"
                        />
                        <Carousel.Caption>
                            <h3>Ofertas especiales</h3>
                            <p>¡Hasta 50% de descuento en seleccionados!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/carrusel3.jpg?raw=true"
                            alt="Tercer slide"
                        />
                        <Carousel.Caption>
                            <h3>Nuevas colecciones</h3>
                            <p>Productos frescos cada semana</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
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