var Influx = require('influx');
const influx = new Influx.InfluxDB('http://root:root@localhost:8086/db');


/* Functions in the DB class that is usable by other files */
module.exports = {


    // get latest inserted weather from given station
    getLatestWeatherData : function(req, res, next, station_id){

        const sql = `SELECT LAST(*) FROM station WHERE station_id = ?`;

        influx.query(sql, function (err, results) {
            if (err) throw err
            
            res.send(results);
        
        }).catch(err => {
            console.log(err)
        })



    },getAllLatestWeatherData : function(req, res, next, length){        

        const sql = `SELECT * FROM station`;


        influx.query(sql, [[parseInt(length)]], function (err, results) {
                if (err) throw err
                
                res.send(results);
            
        }).catch(err => {
            console.log(err)
        })
        
    },
    // get weather data from given station
    getWeatherData : function(req, res, next, station_id, start_time, stop_time){
            
        // get weather data between to given timestamps
        const sql = 'SELECT * FROM station WHERE station_id = ? AND time >= ? AND time <= ?';

        var values =  [id,start_time, stop_time];

        client.query(sql, values, function (err, results) {
            if (err) throw err
            
            res.send(results);
                        
        }).catch(err => {
            console.log(err)
        })
    },
    // get avarage weather data from given station
    getAverageWeatherData : function(req, res, next, station_id, start_time, stop_time){
        
        
            
        // get weather data between to given timestamps
        var sql = "SELECT AVG(road_temperature),AVG(air_temperature), AVG(air_humidity), AVG(wind_speed) \
                    FROM station WHERE station_id = ? AND time >= ? AND time <= ?';
        
            var values =  [station_id,start_time, stop_time];
            
            client.query(sql, values, function (err, results) {
                if (err) throw err

                
                
                // send data back to client
                res.send(results);
                
                auth.decreaseMutex();

                if(auth.getMutex() == 0){
                    mysqlssh.close()
                }
            })

        }).catch(err => {
            console.log(err)
        })    
    }
};


function calculateFilter(hours){
    // these limits are up for tweaking
    if(hours < 96){ // less then 4 days
        return 1;                        
    }else if(hours < 252){   // less then 1.5 week
        return 2;
    }else if(hours < 1008){   // less then 6 weeks
        return 4;
    }else if(hours < 2016){  // less then 12 weeks
        return 8;
    }else{
        return 16;
    }
}

function convertData(result){
    // convert fetched timestamp to correct timezone. 
    // JSON parses timestamp to UTC+0 and we live in UTC+1
    let current_time = result.timestamp;

    current_time.setHours(current_time.getHours() - current_time.getTimezoneOffset() / 60);
    
    // change windspeed from km/h to m/s and use 2 decimals
    result.wind_speed /=  3.6;
    result.wind_speed = result.wind_speed.toFixed(2);
}

