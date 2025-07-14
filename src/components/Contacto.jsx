import "../styles/Contacto.css";

function Contacto() {
    return (
        <div className="contacto-container">
            <div className="contacto-header">
                <h3 className="contacto-title">Contáctanos</h3>
                <p className="contacto-subtitle">¿Tienes alguna pregunta? Escribinos :D</p>
            </div>
            
            <form className="contacto-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        className="form-input"
                        placeholder="Tu nombre completo"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="form-input"
                        placeholder="tucorreo@ejemplo.com"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea 
                        id="mensaje" 
                        className="form-textarea"
                        placeholder="Escribe tu mensaje aquí..."
                        rows="5"
                    ></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                    Enviar Mensaje
                    <span className="button-icon">→</span>
                </button>
            </form>
        </div>
    );
}

export default Contacto;