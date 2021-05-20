
exports.up = async function(knex) {
  await knex.schema.createTable('user', table => {
    table.bigIncrements('userid');
    table.text('username').notNullable();
    table.text('phonenumber').notNullable();
    table.text('password').notNullable();
    table.text('address');
    table.text('email');
    table.bigInteger('role').notNullable();
    table.bigIncrements('parkingid');
  });
  await knex.schema.createTable('vehicle', table => {
    table.bigIncrements('vehicleid');
    table.text('color').notNullable();
    table.text('code').notNullable();
    table.text('type').notNullable();
    table.text('description');
    table.text('QRCode');
    table.bigIncrements('userid').references('userid').inTable('user').notNullable().onDelete('CASCADE');;
    // table.text('password').notNullable();
  });
  // bãi đỗ
  await knex.schema.createTable('parking', table => {
    table.bigIncrements('parkingid');
    table.bigIncrements('userid').notNullable();
    table.text('address').notNullable();
    table.text('parkingname').notNullable();
    table.bigInteger('TotalParkingCar').notNullable();
    table.bigInteger('TotalParkingBike').notNullable();
    table.bigInteger('UsedPackingCar').notNullable();
    table.bigInteger('UsedPackingBike').notNullable();
    table.bigInteger('TotalPackingTime').notNullable();
    // table.text('note').notNullable();
    // table.bigInteger('status').notNullable();
  });
  await knex.schema.createTable('ticket', table => {
    table.bigIncrements('ticketid');
    // table.bigInteger('examid').references('id').inTable('exam').notNullable().onDelete('CASCADE');
    table.text('name').notNullable();
    table.bigInteger('price').notNullable();
    table.bigInteger('typetime').notNullable();
    table.bigInteger('typeverhicle').notNullable();
    table.text('drescription');
    table.bigInteger('isDefault').notNullable();
  });
  await knex.schema.createTable('transaction', table => {
    table.bigIncrements('transactionid');
    table.bigIncrements('userid');
    table.bigIncrements('vehicleID');
    table.bigIncrements('placeID');
    table.bigIncrements('ticketID');
    // table.bigInteger('examid').references('id').inTable('exam').notNullable().onDelete('CASCADE');
    table.text('Timein').notNullable();
    table.text('Timeout').notNullable();
    table.bigIncrements('TotalAmount').notNullable();
    table.bigIncrements('Status').notNullable();


    // thông tin xe
    table.text('color').notNullable();
    table.text('code').notNullable();
    table.text('type').notNullable();
    table.text('description');
    table.text('QRCode');

    // thông tin bãi đỗ
    table.text('address').notNullable();
    table.text('parkingname').notNullable();

    // thông tin người dùng
    table.text('username').notNullable();
    table.text('phonenumber').notNullable();
    table.text('address');

    table.text('guardname').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user');
  await knex.schema.dropTableIfExists('vehicle');
  await knex.schema.dropTableIfExists('parking');
  await knex.schema.dropTableIfExists('ticket');
  await knex.schema.dropTableIfExists('transaction');
};
