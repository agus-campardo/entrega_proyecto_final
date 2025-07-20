import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="kiroo-footer">
            <Container>
                <Row className="g-4">
                    {/* Brand Section */}
                    <Col md={4} className="text-center text-md-start">
                        <div className="footer-brand mb-4">
                            <h3 className="kiroo-logo">KIROO</h3>
                            <p className="footer-tagline">Tu estilo, nuestra pasión</p>
                        </div>
                        <div className="footer-social d-flex justify-content-center justify-content-md-start gap-3">
                            <a href="#" aria-label="Instagram" className="social-icon"><FaInstagram /></a>
                            <a href="#" aria-label="Facebook" className="social-icon"><FaFacebook /></a>
                            <a href="#" aria-label="WhatsApp" className="social-icon"><FaWhatsapp /></a>
                            <a href="#" aria-label="Email" className="social-icon"><MdEmail /></a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col md={4} className="text-center">
                        <h4 className="footer-links-title mb-3">Enlaces rápidos</h4>
                        <div className="footer-links d-flex flex-column gap-2">
                            <Link to="/contacto" className="footer-link">Contacto</Link>
                        </div>
                    </Col>

                    {/* Contact Info */}
                    <Col md={4} className="text-center text-md-end">
                        <h4 className="footer-contact-title mb-3">Contacto</h4>
                        <div className="footer-contact-info">
                            <p><MdEmail className="me-2" />info@kiroo.com</p>
                            <p><FaWhatsapp className="me-2" />+54 11 1234-5678</p>
                            <p>Lun-Vie: 9am - 6pm</p>
                        </div>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="mt-4">
                    <Col className="text-center py-3 border-top">
                        <p className="footer-copyright mb-0">
                            &copy; {new Date().getFullYear()} KIROO - Todos los derechos reservados
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;