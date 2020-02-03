const fs = require('fs')
const papa = require('papaparse')
const authorization = require('./authorization').pool;

/* Functions in the DB class that is usable by other files */
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

module.exports = {

  /* Parses and uploads friction data to database. Contains a couple of constants which might be worth experimenting with if server is running bad. "delay" and "chuckSize"
  * @param file
  */
  uploadFrictionData: function (file) {
    try {
      const delay = 250
      const chunkSize = 50
      // Read file from temporary localstorage /uploads
      fs.readFile(file.path, 'utf-8', (err, data) => {
        parse(data, delay, chunkSize)
      }) 
    } catch(error) {
        throw(error)
    }
  }
}

/* Helper function to parse and send data.
* @param data, delay, chuckSize
*/
const parse = (data, delay, chunkSize) => {
  // Replace mixed linebreaks \r\n with just \n
  data = data.replace(/[\r\n]+/g, '\n');

  // Papa parse with a worker thread
  papa.parse(data, {
    worker: true,
    header: false,
    delimiter: ';',
    newline: '\n',
    skipEmptyLines: true,
    beforeFirstChunk: (data) => {
      // Remove header field
      return data.split('\n').slice(1).join('\n')
    },
    complete: async ({ data }) => {
      try{
        // Upload the data sequentially in rounds
        const stepSize = Math.ceil(data.length/chunkSize)
        sendFrictionData(data, stepSize, delay)
      } catch(error) {
        throw error
      }
    },
  })
}

/* Helper function to send fricitondata to db
* @param data, stepSize, delay
*/
const sendFrictionData = (data, stepSize, delay) => {
  const wait = ms => new Promise(res => setTimeout(res, ms))
  // Make sql query to insert frictiondata
  authorization.getConnection(async function(err, pool){
    if(err){
      throw (err)
    }
    
    let sql = `
      INSERT INTO db.friction_data (
        Id,
        MeasureTimeUTC,
        ReportTimeUTC,
        Latitude,
        Longitude,
        RoadCondition,
        MeasurementType,
        NumberOfMeasurements,
        MeasurementValue,
        MeasurementConfidence,
        MeasurementsVelocity,
        ReporterOrganisation)
      VALUES ?
      ON DUPLICATE KEY UPDATE MeasureTimeUTC=VALUES(MeasureTimeUTC),
        ReportTimeUTC=VALUES(ReportTimeUTC),
        Latitude=VALUES(Latitude),
        Longitude=VALUES(Longitude),
        RoadCondition=VALUES(RoadCondition),
        MeasurementType=VALUES(MeasurementType),
        NumberOfMeasurements=VALUES(NumberOfMeasurements),
        MeasurementValue=VALUES(MeasurementValue),
        MeasurementConfidence=VALUES(MeasurementConfidence),
        MeasurementsVelocity=VALUES(MeasurementsVelocity),
        ReporterOrganisation=VALUES(ReporterOrganisation)
      ;`

    // CASE: the data left to add to DB is less then stepSize, no need to splice just add the data and we are done
    if(stepSize >= data.length) {
      await pool.query(sql, [data],(err, response) => {
        console.log("Upload of frictiondata finished.")
        if(err) {
            throw (err)
        }
      })
    } else {
      // CASE: part of the data is uploaded to db, after this request is done start to upload new part.
      await pool.query(sql, [data.splice(0, stepSize)], async (err, response) => {
        await wait(delay)
        sendFrictionData(data, stepSize, delay)
        if(err) {
            throw (err)
        }
      })
    }
  })
}