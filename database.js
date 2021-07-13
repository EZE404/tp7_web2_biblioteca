const mysql = require('mysql');
const {promisify} = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca',
    port: '3306',
    useUtc: false,
    timezone: "-03:00",
    charset: 'utf8',
    collate: 'utf8_spanish_ci'
});

pool.getConnection((err, con) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se cerró conexión con mysql');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Muchas conexiones a mysql');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexión a mysql rechazada');
        }
    }

    if (con) con.release();
    console.log('Conexión a mysql realizada');
});

// convirtiendo callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;