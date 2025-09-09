const knex = require('knex');
const knexFile = require('../../../knexfile');

// Railway suele poner NODE_ENV vacío o directamente no setearlo.
// Detectamos el entorno: si existe DATABASE_URL usamos 'production'
const environment =
  process.env.NODE_ENV === 'production' || process.env.DATABASE_URL
    ? 'production'
    : 'development';

console.log(`[DB] Using environment: ${environment}`);

module.exports = knex(knexFile[environment]);
