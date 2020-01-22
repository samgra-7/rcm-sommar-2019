const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    database : 'db',
<<<<<<< Updated upstream
    user     : 'root',
=======
    user     : 'mysql',
>>>>>>> Stashed changes
    password : 'password'
});



exports.pool = pool;

