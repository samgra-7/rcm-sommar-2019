const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'rcm-db.chzfmtvm6lcl.us-east-1.rds.amazonaws.com',
    database : 'db',
    user     : 'rcm',
    password : 'uwqodh2819'
});


exports.pool = pool;

