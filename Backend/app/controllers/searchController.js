const searchService = require('../services/searchService');

const searchGlobal = async (req, res) => {
  try {
    const { q, type, limit, page } = req.query;

    const results = await searchService.searchGlobal({
      searchTerm: q,
      type,
      limit,
      page
    });

    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { searchGlobal };
