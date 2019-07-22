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
        
    getDistinctReporterorgFriction : function(req, res, next){
            
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            const sql =`select distinct reporterorganisation from friction_data;`

            
            conn.query(sql, function (err, results) {
                // send data back to client
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
            
            const sql =`SELECT * FROM friction_data a 
            WHERE (
                      acos(sin(a.lat * 0.0175) * sin(? * 0.0175) 
                           + cos(a.lat * 0.0175) * cos(? * 0.0175) *    
                             cos((? * 0.0175) - (a.lon * 0.0175))
                          ) * 6371 <= ?
                  ) and ReporterOrganisation = ?;`

            var variablesql = [lat,lat,lon,(radius/1000),reporter];
            conn.query(sql, variablesql, function (err, results) {
                // send data back to client
                res.send(results);
                conn.release();

                if (err) throw err



            });
        });
    },
    getLatestFrictionData : function(req, res, next, friction_id){
        

           authorization.getConnection(function(err, conn){
            if (err) throw err
             
            let friction_data = [];
    
            const sql = "SELECT * FROM friction_data WHERE id = ?";

            // do a async loop through the station_id list
            async.each(friction_id, function(id, callback){

                // get latest row of station weather data
                const values =  [[id]];

                conn.query(sql, [values], function (err, results) {
                    
                    // convert timestamp and windspeed to wanted units
                    
                    friction_data.push(results);
                    callback();
                    
                })
            
            },function(callback){
                // when async functions are done send data back
                res.send(friction_data);
                conn.release();

              
                if (err) throw err

                
            });
         });
    }

};