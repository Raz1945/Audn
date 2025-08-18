exports.up = function (knex) {
  return knex.schema.createSchemaIfNotExists('music_data');
};

exports.down = function (knex) {
  return knex.schema.dropSchemaIfExists('music_data', true); 
};
