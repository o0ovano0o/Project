const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const cron = require('node-cron');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config();
const { validateAppAPI } = require('./src/middlewares/validateAPIAuthentication');

const reminderSendMail = require('./src/common/sendEmailMonitor');

app.use(
    cors({
        credentials: true,
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        origin: [
            'http://localhost:8080',
            'http://g5.toedu.me'
        ],
    })
);

app.use(express.static('./uploads'));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

    const pgconnectPool = new pg.Pool({
        user: 'uqhumdashdqieg',
        password: '5a0a6876cd265a20148fcb4c7c33dbfb364b25c58492b2ef0ef0820a721a6c0d',
        host: 'ec2-54-246-89-234.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'd4hi7j4oht1ghh',
        ssl: {
          rejectUnauthorized: false,
          require:true
        },
    });

const sess_cfg = {
    store: new pgSession({
        pool: pgconnectPool,
        tableName: 'session',
    }),
    secret: '6rhrD11GJlJt',
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000,
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess_cfg.cookie = {
        sameSite: 'none',
        secure: true,
    };
}

app.use(session(sess_cfg));

app.get('/api/me', validateAppAPI, async (req, res) => {

    res.json({
        id: req.session.user_id,
    });
});

const PUPLIC_APIS = [
    'login',
    'register',
    'parking'
];

const OWNER_APIS = [
   'guard',
   'ticket',
   'parking'
];

/* eslint-disable global-require */
PUPLIC_APIS.forEach((apiPath) =>
    app.use(require(`./src/routes/public/${apiPath}`))
);
OWNER_APIS.forEach((apiPath) => app.use(require(`./src/routes/owner/${apiPath}`)));

// module.exports = app;
const server = app.listen(process.env.PORT || 3000, () =>
    console.log(`Your app is listening on port ${server.address().port}`)
);