const fs = require('fs')
const papa = require('papaparse')
const authorization = require('./authorization').pool;
const mysql = require('mysql');



/* Functions in the DB class that is usable by other files */
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

module.exports = {
  test: function (file) {
    try {
      // Read file from temporary localstorage /uploads
      fs.readFile(file.path, 'utf-8', (err, data) => {
        parse(data)
      }) 
    } catch(error) {
        throw(error)
    }
  }
}

const parse = (data) => {
  // Replace mixed linebreaks \r\n with just \n
  data = data.replace(/[\r\n]+/g, '\n');

  // Papa parse with a worker thread
  papa.parse(data, {
    worker: true,
    delimiter: ';',
    newline: '\n',
    complete: (data) => {
      // Create a nicely structured array to store the parsed data
      /* const parsedData = new Object()
      data.meta.fields.forEach(field => parsedData[field] = new Array())

      data.data.forEach(oneLine => {
        const keys = Object.keys(oneLine)
        keys.forEach(key => {
          parsedData[key].push(oneLine[key])
        })
      }) */
      data.data.shift()
      sendFrictionData(data.data)
    }
  })
}

const sendFrictionData = (data) => {
  //console.log(data)
  // Make sql query to insert frictiondata
  authorization.getConnection(function(err, pool){
    if(err){
      throw (err)
    }
    
    let sql = "INSERT INTO `db`.`friction_data` (`Id`, `MeasureTimeUTC`, `ReportTimeUTC`, `Latitude`, `Longitude`, `RoadCondition`, `MeasurementType`, `NumberOfMeasurements`, `MeasurementValue`, `MeasurementConfidence`, `MeasurementsVelocity`, `ReporterOrganisation`) VALUES ?;";
    pool.query(sql, [data],(err, response) => {
      console.log(response)
      if(err) {
          throw (err)
      }
    })
  })
}