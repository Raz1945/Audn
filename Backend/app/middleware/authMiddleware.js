// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const { getTokenFromHeader } = require('./getTokenFromHeader');

// const authenticateToken = (req, res, next) => {
//   const token = getTokenFromHeader(req.get('Authorization'));

//   if (!token) {
//     return res.status(401).json({ message: 'Token no proporcionado' });
//   }

//   try {
//     const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

//     // Guardamos solo la info segura en req.user
//     req.user = {
//       id: Number(decodedUser.userId),
//       username: decodedUser.username,
//       email: decodedUser.email,
//       is_premium: decodedUser.is_premium
//     };

//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Token inválido o expirado' });
//   }
// };

// module.exports = authenticateToken;


// ! NUEVO
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getTokenFromHeader } = require('./getTokenFromHeader');

const authenticateToken = (req, res, next) => {
  console.log('🔐 === MIDDLEWARE AUTHENTICATE TOKEN ===');
  
  // 1. Obtener el header de Authorization de diferentes formas
  const authHeaderFromGet = req.get('Authorization');
  const authHeaderFromHeaders = req.headers.authorization;
  const authHeaderFromHeadersLower = req.headers.authorization;
  
  console.log('📋 Headers disponibles:', Object.keys(req.headers));
  console.log('🔍 req.get("Authorization"):', authHeaderFromGet);
  console.log('🔍 req.headers.authorization:', authHeaderFromHeaders);
  console.log('🔍 req.headers.Authorization:', req.headers.Authorization); // Algunos clients envían con mayúscula
  
  // 2. Intentar obtener el token de diferentes formas
  let token = null;
  
  if (authHeaderFromGet) {
    token = getTokenFromHeader(authHeaderFromGet);
    console.log('✅ Token desde req.get():', token ? '✓' : '✗');
  }
  
  if (!token && authHeaderFromHeaders) {
    token = getTokenFromHeader(authHeaderFromHeaders);
    console.log('✅ Token desde req.headers.authorization:', token ? '✓' : '✗');
  }
  
  if (!token && req.headers.Authorization) {
    token = getTokenFromHeader(req.headers.Authorization);
    console.log('✅ Token desde req.headers.Authorization:', token ? '✓' : '✗');
  }
  
  // 3. Buscar en otros lugares (solo para debugging)
  if (!token && req.query.token) {
    token = req.query.token;
    console.log('✅ Token desde query string:', token);
  }
  
  if (!token && req.body && req.body.token) {
    token = req.body.token;
    console.log('✅ Token desde body:', token);
  }

  // 4. Verificar si tenemos token
  if (!token) {
    console.log('❌ ERROR: No se pudo extraer token de ninguna fuente');
    console.log('📦 Body recibido:', req.body);
    console.log('🔍 Query params:', req.query);
    return res.status(401).json({ 
      message: 'Token no proporcionado',
      details: 'El token no se encontró en los headers de Authorization'
    });
  }

  console.log('🎯 Token extraído:', token.substring(0, 20) + '...');

  // 5. Verificar el token JWT
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token válido. Usuario:', decodedUser.username);
    
    req.user = {
      id: Number(decodedUser.userId),
      username: decodedUser.username,
      email: decodedUser.email,
      is_premium: decodedUser.is_premium
    };

    console.log('👤 Usuario autenticado:', req.user);
    next();
    
  } catch (err) {
    console.log('❌ ERROR verificando token:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        message: 'Token expirado',
        error: 'El token ha expirado, por favor inicia sesión nuevamente'
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        message: 'Token inválido',
        error: 'El formato del token es incorrecto'
      });
    }
    
    return res.status(403).json({ 
      message: 'Token inválido o expirado',
      error: err.message 
    });
  }
};

module.exports = authenticateToken;
