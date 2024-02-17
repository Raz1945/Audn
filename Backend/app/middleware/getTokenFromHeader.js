// Como algunos sistemas agregan prefijos como "Bearer " al token en la cabecera 'Authorization'
export const getTokenFromHeader = (header) => {
  // Comprueba si el encabezado tiene el formato correcto
  if (header && header.startsWith('Bearer ')) {
    // Devuelve el token sin el prefijo
    return header.slice(7);
  }
  // Si no, devuelve null
  return null;
};
