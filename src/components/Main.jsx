import { Carousel, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { 
  TfiPackage, 
  TfiHeadphone, 
  TfiCreditCard, 
  TfiRocket,
  TfiShoppingCart,
  TfiTag,
  TfiGift
} from "react-icons/tfi";
import "../styles/Main.css";

function Main() {
    return (
        <main className="main-container">
            {/* Carrusel Hero (se mantiene igual) */}
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
                            src=""
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

            {/* Beneficios con Cards de Bootstrap */}
            <Container className="benefits-container py-5">
                <h2 className="text-center mb-5">¿Por qué elegirnos?</h2>
                <Row className="g-4">
                    <Col md={3} sm={6}>
                        <Card className="h-100 benefit-card">
                            <Card.Body className="text-center">
                                <TfiPackage className="benefit-icon" />
                                <Card.Title>Envíos Express</Card.Title>
                                <Card.Text>
                                    Recibe tus productos en 24-48 horas hábiles en todo el país.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="h-100 benefit-card">
                            <Card.Body className="text-center">
                                <TfiHeadphone className="benefit-icon" />
                                <Card.Title>Soporte Premium</Card.Title>
                                <Card.Text>
                                    Atención personalizada 24/7 para resolver todas tus dudas.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="h-100 benefit-card">
                            <Card.Body className="text-center">
                                <TfiCreditCard className="benefit-icon" />
                                <Card.Title>Pago Seguro</Card.Title>
                                <Card.Text>
                                    Todas las formas de pago con la máxima seguridad.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="h-100 benefit-card">
                            <Card.Body className="text-center">
                                <TfiGift className="benefit-icon" />
                                <Card.Title>Beneficios Exclusivos</Card.Title>
                                <Card.Text>
                                    Descuentos y promociones solo para clientes registrados.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Banner Interactivo con Countdown */}
            <Container fluid className="promo-banner py-4">
                <Row className="align-items-center">
                    <Col md={8}>
                        <h3 className="mb-3">¡Oferta Flash! 30% OFF</h3>
                        <p className="mb-0">Solo por tiempo limitado - Usa el código: <strong>FLASH30</strong></p>
                    </Col>
                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                        <Button variant="light" className="promo-btn">
                            <TfiTag className="me-2" />
                            Aprovechar Oferta
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Categorías Destacadas */}
            <Container className="categories-container py-5">
                <h2 className="text-center mb-5">Explora nuestras categorías</h2>
                <Row className="g-4">
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <Card.Img 
                                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                alt="Electrónica"
                            />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Electrónica</Card.Title>
                                <Button variant="outline-light" size="sm" className="align-self-start">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <Card.Img 
                                src="https://github.com/agus-campardo/entrega_proyecto_final/blob/main/public/rapado.jpg?raw=true" 
                                alt="Hogar"
                            />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Hogar</Card.Title>
                                <Button variant="outline-light" size="sm" className="align-self-start">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col lg={4} md={6}>
                        <Card className="category-card text-white">
                            <Card.Img 
                                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                                alt="Moda"
                            />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                                <Card.Title>Moda</Card.Title>
                                <Button variant="outline-light" size="sm" className="align-self-start">
                                    Ver productos
                                </Button>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Newsletter con Formulario */}
            <Container fluid className="newsletter-container py-5">
                <Row className="justify-content-center">
                    <Col lg={6} className="text-center">
                        <TfiShoppingCart className="newsletter-icon mb-3" />
                        <h2 className="mb-3">¡No te pierdas nuestras novedades!</h2>
                        <p className="mb-4">Suscríbete para recibir ofertas exclusivas y actualizaciones de productos.</p>
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