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
    getStationData : function(req, res, next){
       
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            // get all station data that have weather data
            const sql_old = `select * from station_data where id in (select distinct station_id from 
                        (select station_id from weather_data as w order by w.id desc limit 894) as g)`;
            const sql =`select * from station_data where id in (select distinct station_id from weather_data)`
            
            conn.query(sql, function (err, results) {
                
                // send data back to client
                res.send(results);
                conn.release();
                

                if (err) throw err

            });
        });
    }
};