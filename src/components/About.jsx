import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/About.css';
import Footer from './Footer';

function About() {
  return (
    <>
      <section className="about-section">
        <Container className="about-container">
          <h2 className="about-title text-center">SOBRE NOSOTROS</h2>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <p className="about-text text-center">
                En <span className="highlight">nuestra tienda</span>, nos apasiona ofrecer más que simples productos. 
                Creemos en experiencias de compra que inspiren y satisfagan cada necesidad.
              </p>
            </Col>
          </Row>
          
          <Row className="about-features g-4">
            <Col md={4}>
              <div className="feature-card h-100">
                <h3 className="feature-title">CALIDAD</h3>
                <p className="feature-text">
                  Cada artículo en nuestro catálogo pasa por un riguroso proceso de selección para garantizar excelencia.
                </p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="feature-card h-100">
                <h3 className="feature-title">PASIÓN</h3>
                <p className="feature-text">
                  Nos mueve el amor por lo que hacemos y la satisfacción de nuestros clientes.
                </p>
              </div>
            </Col>
            
            <Col md={4}>
              <div className="feature-card h-100">
                <h3 className="feature-title">INNOVACIÓN</h3>
                <p className="feature-text">
                  Constantemente buscamos nuevas tendencias y productos para ofrecerte lo mejor.
                </p>
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <p className="about-closing text-center">
                Ya sea que busques <span className="highlight">tecnología</span>, <span className="highlight">diseño</span> o 
                <span className="highlight"> artículos únicos</span>, estamos aquí para superar tus expectativas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer /> 
    </>    
  );
}

export default About;