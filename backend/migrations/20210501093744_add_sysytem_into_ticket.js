
exports.up = async function(knex) {
  await knex.schema.table('ticket', table => {
    table.bigInteger('isSystem');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('ticket', table => {
    table.dropColumn('isSystem');
  });
};