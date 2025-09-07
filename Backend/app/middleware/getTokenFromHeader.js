// // Como algunos sistemas agregan prefijos como "Bearer " al token en la cabecera 'Authorization'
// const getTokenFromHeader = (header) => {
//   if (!header) return null;

//   // Normaliza y verifica si empieza con "Bearer "
//   const normalized = header.trim();
//   if (normalized.toLowerCase().startsWith('bearer ')) {
//     return normalized.slice(7).trim();
//   }

//   return null;
// };


// ! NUEVO
const getTokenFromHeader = (headerValue) => {
  if (!headerValue) {
    console.log('⚠️  Header value es null/undefined');
    return null;
  }

  console.log('📨 Header value recibido:', headerValue);
  
  // Convertir a string y normalizar
  const header = String(headerValue).trim();
  
  // Verificar si empieza con "Bearer " (case-insensitive)
  if (header.toLowerCase().startsWith('bearer ')) {
    const token = header.slice(7).trim();
    console.log('✂️  Token extraído después de "Bearer ":', token.substring(0, 20) + '...');
    return token;
  }
  
  // Si no tiene "Bearer ", asumimos que es el token directamente
  console.log('🔑 Header sin "Bearer ", usando completo como token:', header.substring(0, 20) + '...');
  return header;
};

module.exports = { getTokenFromHeader };