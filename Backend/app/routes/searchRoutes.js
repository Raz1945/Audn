const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// ====================================
// RUTAS DE BÚSQUEDA
// ====================================

//* Búsqueda global
router.get('/search', searchController.searchGlobal);

// Ejemplo de rutas de búsqueda
// /search?q=get&type=songs&limit=10&page=1
// /search?q=John&type=artists
// /search?q=rock

module.exports = router;
