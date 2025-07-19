import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">SOBRE NOSOTROS</h2>
        <div className="about-content">
          <p className="about-text">
            En <span className="highlight">nuestra tienda</span>, nos apasiona ofrecer más que simples productos. 
            Creemos en experiencias de compra que inspiren y satisfagan cada necesidad.
          </p>
          
          <div className="about-features">
            <div className="feature-card">
              <h3 className="feature-title">CALIDAD</h3>
              <p className="feature-text">
                Cada artículo en nuestro catálogo pasa por un riguroso proceso de selección para garantizar excelencia.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">PASIÓN</h3>
              <p className="feature-text">
                Nos mueve el amor por lo que hacemos y la satisfacción de nuestros clientes.
              </p>
            </div>
            
            <div className="feature-card">
              <h3 className="feature-title">INNOVACIÓN</h3>
              <p className="feature-text">
                Constantemente buscamos nuevas tendencias y productos para ofrecerte lo mejor.
              </p>
            </div>
          </div>
          
          <p className="about-closing">
            Ya sea que busques <span className="highlight">tecnología</span>, <span className="highlight">diseño</span> o 
            <span className="highlight"> artículos únicos</span>, estamos aquí para superar tus expectativas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;