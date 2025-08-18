// Como algunos sistemas agregan prefijos como "Bearer " al token en la cabecera 'Authorization'
const getTokenFromHeader = (header) => {
  if (!header) return null;

  // Normaliza y verifica si empieza con "Bearer "
  const normalized = header.trim();
  if (normalized.toLowerCase().startsWith('bearer ')) {
    return normalized.slice(7).trim();
  }

  return null;
};

module.exports = { getTokenFromHeader };