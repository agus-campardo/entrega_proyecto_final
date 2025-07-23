import React, { createContext, useState, useContext, useEffect } from 'react'; // Añade useEffect aquí
import { logearG } from '../auth/firebase';

// Crear el contexto de autenticación
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const username = token.replace('fake-token-', '');
      setUser(username);
      if (username === "admin@gmail.com") setAdmin(true);
    }
  }, []);

  const login = (username) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    if(username == "admin@gmail.com"){ //contraseña : test12
      setAdmin(true)
    }
    localStorage.setItem('authToken', token);
    setUser(username);
  };

  function logearGmail(){
    logearG().then((data) => {
      console.log(data)
      const token = `fake-token-${data.email}`;
      setUser(data.email)
      localStorage.setItem('authToken', token);
    })
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setAdmin(false)
  };

  function verificacionLog(){
    const userToken = localStorage.getItem("authToken")
    if(userToken && userToken == "fake-token-admin@gmail.com"){
      setAdmin(true)
      return
    }if(userToken){
      setUser(userToken)
    }
  }

  return (
    <AuthContext.Provider value={{ logearGmail, user, login, logout, admin, verificacionLog }}>
      {children}
    </AuthContext.Provider> 
  );
}

export const useAuthContext = () => useContext(AuthContext);