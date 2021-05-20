const development = {
  client: 'pg',
  connection: {
    user: 'uqhumdashdqieg',
    password: '5a0a6876cd265a20148fcb4c7c33dbfb364b25c58492b2ef0ef0820a721a6c0d',
    host: 'ec2-54-246-89-234.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd4hi7j4oht1ghh',
    ssl: {
      rejectUnauthorized: false,
      require:true
    },
  },
}
module.exports = {
  development,
  production:development
};