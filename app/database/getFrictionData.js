// const mysqlssh = require('mysql-ssh');
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
    getFrictionData : function(req, res, next, reporter){
       
        // ssh to database server and then connect to db
        // mysqlssh.connect(auth.ssh, auth.database).then(client => {
        
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
                // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select t.id, t.MeasureTimeUTC, t.ReportTimeUTC, t.lat, t.lon, t.RoadCondition, t.MeasurementType, t.NumberOfMeasurements, t.MeasurementValue, 
            t.MeasurementConfidence, t.MeasurementsVelocity, t.ReporterOrganisation, t.EquipmentType
                        from friction_data t
                        inner join(
                            select  lat, lon,  max(id) as MaxID
                            from friction_data
                            WHERE reporterOrganisation = ?
                            group by lat, lon
                        ) tm on t.lat = tm.lat and t.lon = tm.lon and t.id = tm.MaxID;`
            conn.query(sql, [reporter], function (err, results) {
                res.send(results);
                conn.release();
                if (err) throw err
            });

        });
    },
        

    // Check connection to MySQL 
    getAllFrictionData : function(req, res, next){
            
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data;`

            
            conn.query(sql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();
                if (err) throw err
     
            });

        });
    },

     // Check connection to MySQL 
     getFrictionDataRect : function(req, res, next, reporter, SWlat, NElat, SWlon, NElon){
        
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data where reporterOrganisation = ? and lat between ? and ? and lon between ? and ?;`
            var values = [reporter, SWlat, NElat, SWlon, NElon];
            
            conn.query(sql, values, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();

                if (err) throw err
            });
        });



    },

     // Check connection to MySQL 
     getFrictionDataCirc : function(req, res, next, reporter, lat, lon, radius){
       

        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data WHERE reporter = ? AND lat ;`

            
            conn.query(sql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();

                if (err) throw err


            });
        });
    }

};