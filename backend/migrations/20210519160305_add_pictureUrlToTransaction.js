
exports.up = async function(knex) {
  await knex.schema.table('transaction', table => {
    table.text('pictureUrl');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('transaction', table => {
    table.dropColumn('pictureUrl');
  });
};