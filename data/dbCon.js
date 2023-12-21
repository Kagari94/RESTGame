require('dotenv').config({path: '.env'});
const mysql = require('mysql2/promise');

const conf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

console.log(conf)

const dbPool = mysql.createPool(conf);

module.exports = dbPool;
