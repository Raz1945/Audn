require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getTokenFromHeader } = require('./getTokenFromHeader');

const authenticateToken = (req, res, next) => {
  const token = getTokenFromHeader(req.get('Authorization'));

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos solo la info segura en req.user
    req.user = {
      id: Number(decodedUser.userId),
      username: decodedUser.username,
      email: decodedUser.email,
      is_premium: decodedUser.is_premium
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = authenticateToken;
