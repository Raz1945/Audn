import axios from 'axios';

// Esto es para hacer un fallback automático a localhost si la petición a producción falla
// por ejemplo, si el servidor de producción está caído

const PROD_URL = import.meta.env.VITE_API_URL;      // Railway / Producción
const LOCAL_URL = 'http://localhost:3000';          // Local

// Crear instancia de axios
export default axios.create({
  baseURL: PROD_URL,
  withCredentials: true
});

// Middleware para fallback automático
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.code === 'ERR_NETWORK' && error.config.baseURL !== LOCAL_URL) {
      // Cambiar baseURL a local y reintentar
      error.config.baseURL = LOCAL_URL;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

