const authorization = require('./authorization').pool;
var async = require("async");



/* Functions in the DB class that is usable by other files */
module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */


    // Check connection to MySQL 
    getCameraData : function(req, res, next){
       
        authorization.getConnection(function(err, conn){
            if (err) throw err
            

            const sql =`select * from camera_data`
            
            conn.query(sql, function (err, results) {
                
                // send data back to client
                res.send(results);
                conn.release();
                

                if (err) throw err

            });
        });
    }
};