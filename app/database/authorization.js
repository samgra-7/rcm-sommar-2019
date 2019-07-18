const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'rcm-db.chzfmtvm6lcl.us-east-1.rds.amazonaws.com',
    database : 'db',
    user     : 'read-only_rcm',
    password : 'aikf39afm'
});



exports.pool = pool;

