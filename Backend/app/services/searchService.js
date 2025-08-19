const searchModel = require('../models/searchModel');

const searchGlobal = async ({ searchTerm, type, limit, page }) => {
  if (!searchTerm || searchTerm.trim() === '') {
    throw new Error('Debe ingresar un término de búsqueda.');
  }

  const pageNumber = page && page > 0 ? parseInt(page) : 1;
  const pageSize = limit && limit > 0 ? parseInt(limit) : 50;
  const offset = (pageNumber - 1) * pageSize;

  return await searchModel.searchGlobal({ searchTerm: searchTerm.trim(), type, limit: pageSize, offset });
};

module.exports = { searchGlobal };
