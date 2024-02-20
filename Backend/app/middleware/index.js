require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getTokenFromHeader } = require('./getTokenFromHeader');

const authenticateToken = async (req, res, next) => {
  // Obtiene el token de la cabecera usando la función auxiliar
  const token = getTokenFromHeader(req.get('Authorization'));

  // Si no hay token, devuelve un error 401
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verifica el token con el secreto y espera el resultado
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    // Guarda el usuario en el objeto req y pasa al siguiente middleware
    req.user = user;
    next();
  } catch (err) {
    // Si hay un error, devuelve un error 403
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
