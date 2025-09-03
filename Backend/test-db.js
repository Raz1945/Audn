const db = require('./app/database/config/db');

require('dotenv').config();

(async () => {
  try {
    const result = await db.raw('SELECT NOW()');
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log('Hora actual en el servidor:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
  } finally {
    await db.destroy(); // cerrar la conexión
  }
})();
