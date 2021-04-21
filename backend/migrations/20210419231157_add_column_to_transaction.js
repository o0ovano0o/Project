
exports.up = async function(knex) {
  await knex.schema.table('transaction', table => {
    table.bigInteger('typetimeticket');
    table.bigInteger('priceticket');
    table.text('nameticket');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('transaction', table => {
    table.dropColumn('typetimeticket');
    table.dropColumn('priceticket');
    table.text('nameticket');
  });
};