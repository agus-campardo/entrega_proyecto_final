import { Carousel, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TfiTag, TfiShoppingCart } from "react-icons/tfi";
import "../styles/Main.css";

function Main() {
    return (
        <main className="main-container">
            {/* Carrusel Hero - Solo imágenes */}
            <section className="hero-carousel mb-4">
                <Carousel controls indicators>
                    <Carousel.Item>
                        <Link to="/productos">
                            <div className="carousel-image-container">
                                <img
                                    className="carousel-image"
                                    src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/carrusel1.jpg?raw=true"
                                    alt="Nueva colección KIROO"
                                />
                            </div>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/productos">
                            <div className="carousel-image-container">
                                <img
                                    className="carousel-image"
                                    src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/c-d-x-PDX_a_82obo-unsplash.jpg?raw=true"
                                    alt="Ofertas KIROO"
                                />
                            </div>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/productos">
                            <div className="carousel-image-container">
                                <img
                                    className="carousel-image"
                                    src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/j.jpg?raw=true"
                                    alt="Últimos ingresos KIROO"
                                />
                            </div>
                        </Link>
                    </Carousel.Item>
                </Carousel>
            </section>

            {/* Banner Interactivo */}
            <Container fluid className="promo-banner py-4 mb-5 position-relative overflow-hidden">
                <div className="promo-banner-pattern"></div>
                <Row className="align-items-center position-relative">
                    <Col md={8}>
                        <div className="d-flex align-items-center">
                            <div className="promo-badge me-3">30%</div>
                            <div>
                                <h3 className="mb-2">¡Oferta!</h3>
                                <p className="mb-0">Solo por tiempo limitado - Usa el código: <strong className="promo-code">KIROO30</strong></p>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                        <Button as={Link} to="https://www.mercadolibre.com.ar/ofertas" variant="light" className="promo-btn">
                            <TfiTag className="me-2" />
                            Aprovechar Oferta
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Categorías Destacadas - Versión mejorada */}
            <Container className="categories-container py-5">
                <div className="section-header mb-5">
                    <h2 className="section-title">Explora nuestros productos</h2>
                    <div className="title-underline"></div>
                </div>
                <Row className="g-4">
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <div className="category-image-container">
                                <Card.Img 
                                    className="category-image"
                                    src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                    alt="Tecnología"
                                />
                            </div>
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end category-overlay">
                                <Card.Title>Tecnología</Card.Title>
                                <Button as={Link} to="/productos" variant="outline-light" size="sm" className="category-btn">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <div className="category-image-container">
                                <Card.Img 
                                    className="category-image"
                                    src="https://picsum.photos/seed/QEzefMbenS/3707/1742" 
                                    alt="Entretenimiento"
                                />
                            </div>
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end category-overlay">
                                <Card.Title>Entretenimiento</Card.Title>
                                <Button as={Link} to="/productos" variant="outline-light" size="sm" className="category-btn">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <div className="category-image-container">
                                <Card.Img 
                                    className="category-image"
                                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                    alt="Decoración"
                                />
                            </div>
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end category-overlay">
                                <Card.Title>Decoración</Card.Title>
                                <Button as={Link} to="/productos" variant="outline-light" size="sm" className="category-btn">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* ¿Inscribirse? */}
            <Container fluid className="newsletter-container py-5">
                <Row className="justify-content-center">
                    <Col lg={6} className="text-center">
                        <TfiShoppingCart className="newsletter-icon mb-3" />
                        <h2 className="mb-3">¿Te gustaría suscribirte?</h2>
                        <p className="mb-4">Recibe primero novedades y ofertas exclusivas.</p>
                        <div className="d-flex">
                            <input 
                                type="email" 
                                className="form-control newsletter-input" 
                                placeholder="Tu correo electrónico" 
                            />
                            <Button variant="dark" className="ms-2 newsletter-btn">
                                Suscribirse
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Main;