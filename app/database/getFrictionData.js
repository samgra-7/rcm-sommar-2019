const mysqlssh = require('mysql-ssh');
const authorization = require('./authorization');
var async = require("async");



/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    getAllFrictionData : function(req, res, next){
       
        let auth = authorization.Authorization;
        auth.increaseMutex();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data;`

            
            client.query(sql, function (err, results) {
                if (err) throw err
                // send data back to client
                res.send(results);

                auth.decreaseMutex();

                if(auth.getMutex() == 0){
                    mysqlssh.close()
                }
            });

        }).catch(err => {
            console.log(err)
        }) 
    }
};