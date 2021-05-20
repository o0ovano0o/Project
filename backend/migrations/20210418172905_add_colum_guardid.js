
exports.up = async function(knex) {
  await knex.schema.table('transaction', table => {
    table.bigInteger('guardid');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('transaction', table => {
    table.dropColumn('guardid');
  });
};