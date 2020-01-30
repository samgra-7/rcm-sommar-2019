const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    database : 'db',
    user     : 'mysql',
    password : 'password'
});



exports.pool = pool;

/*
module.exports = {
/*
    array är en tvådimentionell lista(Dictionary)
    
    upload loopar igenom listan och matar in rad för rad, 
    
    vet inte om det är bättre än att göra allt i ett,

    den ska vara sql-injection safe, inte 100% säker dock
    */
    /*
    upload: function(array){
        for(i=0; i<input.length;i++){
            input = array[i];
            let firstsSql = "INSERT INTO `db`.`friction_data` (`id`, `MeasureTimeUTC`, `ReportTimeUTC`, `lat`, `lon`, `RoadCondition`, `MeasurementType`, `NumberOfMeasurements`, `MeasurementValue`, `MeasurementConfidence`, `MeasurementsVelocity`, `ReporterOrganisation`) VALUES ('?', ?, `?`, `?`, `?`, `?`, `?`, `?`, `?`, `?`, `?`, `?`);";
            let sql = mysql.format(firstSql,[input.id, input.MeasureTimeUTC, input.ReportTimeUTC, input.lat, input.lon, input.RoadCondition, input.MeasurementType, input.NumberOfMeasurements, input.MeasurementValue, input.MeasurementConfidence, input.MeasurementsVelocity, input.ReporterOrganisation])
            pool.query(sql,(err, response) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(response.insertId);
        });
    }

    }

};
*/
function upploadBook(ID) {
    let query2 = "INSERT INTO `db`.`Books` (`idBooks`, `author`) VALUES ('?', 'JRR Tolkien');";
    let query = mysql.format(query2, [ID]);
    // query = DELETE from `todo` where `user`='shahid';
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
};

upploadBook(28);

