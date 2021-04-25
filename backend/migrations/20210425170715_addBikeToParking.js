
exports.up = async function(knex) {
  await knex.schema.table('parking', table => {
    table.bigInteger('TotalParkingMotoBike');
    table.bigInteger('UsedPackingMotoBike');
  });
};

exports.down =async function(knex) {
  await knex.schema.table('parking', table => {
    table.dropColumn('TotalParkingMotoBike');
    table.dropColumn('UsedPackingMotoBike');
  });
};