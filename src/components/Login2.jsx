import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import '../styles/Login.css'; 

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit2 = (e) => {
    e.preventDefault();
    logout();
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        }
        if (error.code === "auth/email-already-in-use") {
          dispararSweetBasico("Ese email ya está registrado", "", "error", "Cerrar");
        }
      });
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  }

  function logInGmail() {
    logearGmail()
      .then(() => {
        dispararSweetBasico("Logeo exitoso con Google", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          dispararSweetBasico("Cancelaste el inicio de sesión con Google", "", "info", "Entendido");
        } else {
          dispararSweetBasico("Error inesperado", error.message, "error", "Cerrar");
        }
      });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  if (user || admin) {
    return (
      <div className="logout-container">
        <div className="logout-card">
          <h2 className="logout-title">¡Hola {user || admin}!</h2>
          <p className="logout-text">Estás actualmente conectado. ¿Querés cerrar tu sesión?</p>
          <form onSubmit={handleSubmit2}>
            <button type="submit" className="btn logout-btn">Cerrar sesión</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {show ? (
        <form onSubmit={iniciarSesionEmailPass} className="login-form">
          <h2>Iniciar sesión</h2>
          <p className="subtitle">Ingresá tus credenciales para acceder a tu cuenta</p>

          <label>Email</label>
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            type="email"
            placeholder="tu@email.com"
            required
          />

          <label>Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
          />

          <div className="login-button-group">
            <button type="submit">Ingresar</button>
            <div className="login-divider">o</div>
            <button type="button" className="secondary-btn" onClick={logInGmail}>Iniciar sesión con Google</button>
            <button type="button" className="secondary-btn" onClick={handleShow}>Crear una cuenta</button>
          </div>
        </form>

      ) : (
        <form onSubmit={registrarUsuario} className="login-form">
          <h2>Crear cuenta</h2>
          <p className="subtitle">Completá el formulario para registrarte</p>

          <label>Email</label>
          <input
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••• (mínimo 6 caracteres)"
            required
          />

          <div className="login-button-group">
            <button type="submit">Registrarse</button>
            <button type="button" className="secondary-btn" onClick={handleShow}>Volver al inicio de sesión</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login2;