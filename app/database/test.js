var Influx = require('influx');

const influx = new Influx.InfluxDB('http://root:root@localhost:8086/db');

// const influx = new Influx.InfluxDB({
//   host: 'localhost',
//   port: '8086',
//   database: 'db',

// });


// influx.getDatabaseNames()
//   .then(names => {
//     if (!names.includes('db')) {
//       return influx.createDatabase('db');
//     }
//   })
//   .then(() => {
//     app.listen(app.get('8086'), () => {
//       console.log(`Listening on ${app.get('8086')}.`);
//     });
//     writeDataToInflux(hanalei);
//     writeDataToInflux(hilo);
//     writeDataToInflux(honolulu);
//     writeDataToInflux(kahului);
//   })
//   .catch(error => console.log({ error }));



/* Functions in the DB class that is usable by other files */
module.exports = {

        getInflux : function(req, res, next){

                
            influx.query(`select * from station`)
            .then( result => response.status(200).json(result) )
            .catch( error => response.status(500).json({ error }) );
            
        
    }
    
    
};



