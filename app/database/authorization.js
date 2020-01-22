const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    database : 'db',
    user     : 'root',
    password : 'password'
});



exports.pool = pool;

