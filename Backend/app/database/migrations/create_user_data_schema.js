exports.up = function (knex) {
  return knex.schema.createSchemaIfNotExists('user_data');
};

exports.down = function (knex) {
  return knex.schema.dropSchemaIfExists('user_data', true); 
};