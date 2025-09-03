require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('../app/routes');

// Obtener las variables de entorno
const port = process.env.PORT || 3000; // Puerto del servidor
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173'; // Origen permitido para el CORS

// Crear la aplicación Express
const app = express();

// Configurar el middleware CORS
app.use(
  cors({
    origin: corsOrigin, // Especificar el origen permitido para el CORS
    credentials: true, // Permitir el envío de credenciales en las solicitudes
    allowedHeaders: ['Content-Type', 'Authorization'], // Especificar los encabezados permitidos
    exposedHeaders: ['Authorization'] // 👈 Agrega esto si es necesario
  })
);

//* Manejar preflight OPTIONS requests para todas las rutas
app.options('*', (req, res) => {
  console.log('Preflight OPTIONS request recibida');
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

// Configurar el middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());



//* Middleware de debug para ver todas las requests
app.use((req, res, next) => {
  console.log('=== NUEVA REQUEST ===');
  console.log('Time:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('=====================');
  next();
});


// Configurar las rutas de la API
app.use('/', routes);

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
