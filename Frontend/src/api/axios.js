// import axios from 'axios';

// // Detecta si estamos en producción o local
// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// // Configuración Global de  Axios, ayuda a reducir la redundancia en tus solicitudes.
// export default axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true // si tu backend usa cookies
//   // baseURL: 'http://localhost:3000',
// });


// TODO Cambiar la manera en que se exporta la configuración de axios
// para que sea como api tambien hay que cambiarlo en los demas componentes.
  // export const api = axios.create({
  //   baseURL: BASE_URL,
  //   withCredentials: true // si tu backend usa cookies
  // });

// Esto es para hacer un fallback automático a localhost si la petición a producción falla
// por ejemplo, si el servidor de producción está caído

import axios from 'axios';

const PROD_URL = import.meta.env.VITE_API_URL;      // Railway / Producción
const LOCAL_URL = 'http://localhost:3000';          // Local

// Crear instancia de axios
const api = axios.create({
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

export default api;
