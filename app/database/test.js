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
        const stepSize = Math.ceil(data.length/50)
        sendFrictionData(data, stepSize)
      } catch(error) {
        console.log(error)
        throw error
      }
    },
  })
}

//  Update the db with the friction data
const stepFrictionData = async (data, stepSize) => {
  if(stepSize >= data.length) {
    await sendFrictionData(data)
    console.log("REACHED END:" + "STEPSIZE " + stepSize + " ARRAY LENGTH: " + data.length)
  } else {
    await sendFrictionData(data.splice(0, stepSize))
    stepFrictionData(data, stepSize)
  }
}

const sendFrictionData = (data,stepSize) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  console.log(data.length)
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
      console.log("StepSize: " + stepSize + " data.length: " + data.length)
      await pool.query(sql, [data],(err, response) => {
        console.log("Upload Finished")
        if(err) {
          //console.log(err.sqlMessage)
            throw (err)
        }
      })
    } else {
      // CASE: part of the data is uploaded to db, after this request is done start to upload new part.
      await pool.query(sql, [data.splice(0, stepSize)], async (err, response) => {
        await delay(250)
        sendFrictionData(data, stepSize)
        if(err) {
          //console.log(err.sqlMessage)
            throw (err)
        }
      })
    }
  })
}