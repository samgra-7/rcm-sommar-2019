const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    database : 'db',
    user     : 'mysql',
    password : 'password'
});



exports.pool = pool;

