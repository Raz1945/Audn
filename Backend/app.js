require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes');

// Puerto del servidor
const port = process.env.PORT || 3000;


// Crear la aplicación Express
const app = express();

// Lista de orígenes permitidos
const allowedOrigins = [
  'http://localhost:5173',
  /\.vercel\.app$/  // acepta cualquier dominio que termine en vercel.app
];

// Configurar el middleware CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.some(o =>
        o instanceof RegExp ? o.test(origin) : o === origin
      )
    ) {
      callback(null, true);
    } else {
      console.error(`CORS bloqueado: origen no permitido -> ${origin}`);
      callback(new Error(`CORS no permitido para ${origin}`));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());

// Middleware de debug
app.use((req, res, next) => {
  console.log('=== NUEVA REQUEST ===');
  console.log('Time:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers.origin);
  console.log('Body:', req.body);
  console.log('=====================');
  next();
});

// Rutas de la API
app.use('/', routes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
