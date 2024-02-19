require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');

// Obtener las variables de entorno
const port = process.env.PORT || 3000; // Puerto del servidor
const corsOrigin = process.env.CORS_ORIGIN; // Origen permitido para el CORS

// Crear la aplicación Express
const app = express();

// Configurar el middleware CORS
app.use(
  cors({
    origin: corsOrigin, // Especificar el origen permitido para el CORS
    credentials: true, // Permitir el envío de credenciales en las solicitudes
  })
);
app.options('*', cors()); // Aplicar el CORS a todas las rutas

// Configurar el middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configurar las rutas de la API
app.use('/', routes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
