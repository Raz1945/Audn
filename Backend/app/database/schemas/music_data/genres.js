const knex = require('knex');  

const createGenresTable = (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).unique().notNullable();
};

module.exports = createGenresTable;
