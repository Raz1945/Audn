require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');

// Obtener las variables de entorno
const port = process.env.PORT || 3000;

// Detectar entorno de frontend automáticamente
const allowedOrigins = [
  'http://localhost:5173', // desarrollo local
  'https://audn-1u0f1r5bx-raz1945s-projects.vercel.app' // producción Vercel
];

// Crear la aplicación Express
const app = express();

// Configurar el middleware CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (como Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origen no permitido -> ${origin}`));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
  })
);

//* Manejar preflight OPTIONS requests para todas las rutas
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
