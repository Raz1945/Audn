import axios from 'axios';

// Detecta si estamos en producción o local
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Configuración Global de  Axios, ayuda a reducir la redundancia en tus solicitudes.
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true // si tu backend usa cookies
  // baseURL: 'http://localhost:3000',
});

