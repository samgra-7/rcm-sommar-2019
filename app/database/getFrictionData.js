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
    getFrictionData : function(req, res, next, reporter){
       
        let auth = authorization.Authorization;
        auth.increaseMutex();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
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

                client.query(sql, [reporter], function (err, results) {
                    if (err) throw err

                    res.send(results);
                    
                    auth.decreaseMutex();

                    if(auth.getMutex() == 0){
                        mysqlssh.close()
                    }
                });
                    
                
    
        }).catch(err => {
            console.log(err)
        })
    },            

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
    },

     // Check connection to MySQL 
     getFrictionDataRect : function(req, res, next, reporter, SWlat, NElat, SWlon, NElon){
       
        let auth = authorization.Authorization;
        auth.increaseMutex();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data where reporterOrganisation = ? and lat between ? and ? and lon between ? and ?;`
            var values = [reporter, SWlat, NElat, SWlon, NElon];
            
            client.query(sql, values, function (err, results) {
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
    },

     // Check connection to MySQL 
     getFrictionDataCirc : function(req, res, next, reporter, lat, lon, radius){
       
        let auth = authorization.Authorization;
        auth.increaseMutex();

        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            
            // get all station data that have weather data
            // const sql =`select * from friction_data LIMIT 10;`
            const sql =`select * from friction_data WHERE reporter = ? AND lat ;`

            
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
    },
    getLatestFrictionData : function(req, res, next, friction_id){
        

        let auth = authorization.Authorization;
        let friction_data = [];
        auth.increaseMutex();
        // ssh to database server and then connect to db
        mysqlssh.connect(auth.ssh, auth.database).then(client => {
            const sql = "SELECT * FROM friction_data WHERE id = ?";

            // do a async loop through the station_id list
            async.each(friction_id, function(id, callback){

                // get latest row of station weather data
                const values =  [[id]];

                client.query(sql, [values], function (err, results) {
                    if (err) throw err
                    
                    // convert timestamp and windspeed to wanted units
                    
                    friction_data.push(results);
                    callback();
                    
                })
            
            },function(callback){
                // when async functions are done send data back
                res.send(friction_data);

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