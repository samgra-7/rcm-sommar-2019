const mysql = require('mysql');
const authorization = require('./authorization').pool;
var async = require("async");

module.exports = {
    
  /*array är en tvådimentionell lista(Dictionary)
    
    upload loopar igenom listan och matar in rad för rad, 
    
    vet inte om det är bättre än att göra allt i ett,

    den ska vara sql-injection safe, inte 100% säker dock

    
    */
   upload: function(req, res, next){
       console.log("Upload")
    /*var input = new Object();
       input.id = new Array();
       input.id.push('1')

       input.MeasureTimeUTC = new Array();
       input.MeasureTimeUTC
       
       ['1', '2019-02-01 00:00:10', '2019-02-01 00:30:01', '576,703,127,523', '121,210,512,813', '-1', '1', '34', '623,529', '5', '52', 'RoadCloud', NULL
    ]*/
       //for(i=0; i<input.length;i++){
          // input = req[i];
          
          try{

            authorization.getConnection(function(err, pool){
                if(err){
                    console.log(err)
                    return;
                }
                
           //let firstSql = "INSERT INTO `db`.`friction_data` (`id`, `MeasureTimeUTC`, `ReportTimeUTC`, `lat`, `lon`, `RoadCondition`, `MeasurementType`, `NumberOfMeasurements`, `MeasurementValue`, `MeasurementConfidence`, `MeasurementsVelocity`, `ReporterOrganisation`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            console.log("Mellan SQL")
            let sql = "INSERT INTO `db`.`friction_data` (`id`, `MeasureTimeUTC`, `ReportTimeUTC`, `lat`, `lon`, `RoadCondition`, `MeasurementType`, `NumberOfMeasurements`, `MeasurementValue`, `MeasurementConfidence`, `MeasurementsVelocity`, `ReporterOrganisation`,`EquipmentType`) VALUES (?);"
           //let sql = mysql.format(firstSql,[[2, '2019-02-01 00:00:10', '2019-02-01 00:30:01', '576,703,127,523', '121,210,512,813', '-1', '1', '34', '623,529', '5', '52', 'RoadCloud', 'NULL']]);
           value = [[232, '2019-02-01 00:00:10', '2019-02-01 00:30:01', '576,703,127,523', '121,210,512,813', '-1', '1', '34', '623,529', '5', '52', 'RoadCloud', 'NULL'][4005021, '2019-02-01 00:00:10', '2019-02-01 00:30:01', '576,703,127,523', '121,210,512,813', '-1', '1', '34', '623,529', '5', '52', 'RoadCloud', 'NULL']]
           console.log("SQL: " + sql)
           pool.query(sql,value,(err, response) => {
           if(err) {
               console.error(err);
               return;
           }
           console.log(response.insertId);
       });
    })
    }catch(error){
        console.log(error)
    }

}
  // }


}