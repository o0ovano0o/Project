
exports.up = async function(knex) {
  await knex.schema.table('parking', table => {
    table.text('open_time');
    table.text('close_time');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('parking', table => {
    table.dropColumn('open_time');
    table.dropColumn('close_time');
  });
};