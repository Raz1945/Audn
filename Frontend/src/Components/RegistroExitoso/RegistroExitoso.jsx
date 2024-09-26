import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegistroExitoso = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>¡Bienvenido!</h1>
      
      <p>Serás redirigido en unos momentos...</p>
    </div>
  );
};
