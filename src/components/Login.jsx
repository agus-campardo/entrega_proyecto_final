import { useState } from "react";
import { CarritoContext } from "../contexts/CarritoContext";
import "../styles/Login.css";
import Notification from "./Notificacion";

function Login({ setLogeadoUser, setLogeadoAdmin, user, admin }) {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleLogin = (type, callback) => {
        const wasLoggedIn = type === 'user' ? user : admin;
        callback(); 
        
        // Mostrar cartelito de que se unició o salió de la sesión
        setNotificationMessage(
            wasLoggedIn 
                ? `🔒 Sesión de ${type} cerrada correctamente` 
                : `✅ Sesión de ${type} iniciada correctamente`
        );
        setShowNotification(true);
        
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className="login-container">
            <button 
                className={`login-btn ${user ? 'logout' : ''}`}
                onClick={() => handleLogin('usuario', setLogeadoUser)}
            >
                {user ? "Cerrar sesión" : "Iniciar sesión"}
            </button>
            <button 
                className={`admin-btn ${admin ? 'logout' : ''}`}
                onClick={() => handleLogin('admin', setLogeadoAdmin)}
            >
                {admin ? "Cerrar sesión Admin" : "Iniciar sesión Admin"}
            </button>
            
            <Notification 
                show={showNotification} 
                message={notificationMessage} 
            />
        </div>
    );
}

export default Login;