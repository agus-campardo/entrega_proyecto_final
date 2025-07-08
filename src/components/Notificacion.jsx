import { useState, useEffect } from 'react';
import "../styles/Notificacion.css";

export default function Notification({ show, message }) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!shouldRender) return null;

  return (
    <div className={`notification ${isVisible ? 'show' : 'hide'}`}>
      <p>{message}</p>
    </div>
  );
}