 import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="kiroo-footer">
            <div className="footer-content">
                {/* Logo y nombre */}
                <div className="footer-brand">
                    <h3>KIROO</h3>
                    <p>Tu estilo, nuestra pasión</p>
                </div>

                {/* Redes sociales */}
                <div className="footer-social">
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="Facebook"><FaFacebook /></a>
                    <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                    <a href="#" aria-label="Email"><MdEmail /></a>
                </div>

                {/* Links rápidos */}
                <div className="footer-links">
                    <Link to="/contacto">Contacto</Link>
                    <Link to="/preguntas-frecuentes">FAQs</Link>
                    <Link to="/terminos">Términos</Link>
                    <Link to="/privacidad">Privacidad</Link>
                </div>
            </div>

            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} KIROO - Todos los derechos reservados</p>
            </div>
        </footer>
    );
}

export default Footer;