const fs = require('fs')
const papa = require('papaparse')



/* Functions in the DB class that is usable by other files */
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

   module.exports = {
    test: function (file) {
      // Read file from temporary localstorage /uploads
      fs.readFile(file.path, 'utf-8', (err, data) => {

        // Replace mixed linebreaks \r\n with just \n
        data = data.replace(/[\r\n]+/g, '\n');
        if(err) {
          throw err;
        }

        // Papa parse with a worker thread
        papa.parse(data, {
          worker: true,
          header: true,
          transformHeader: h => h.trim(),
          delimiter: ';',
          newline: '\n',
          complete: (data) => {
            // Create a nicely structured array to store the parsed data
            const parsedData = new Object()
            data.meta.fields.forEach(field => parsedData[field] = new Array())

            data.data.forEach(oneLine => {
              const keys = Object.keys(oneLine)
              keys.forEach(key => {
                parsedData[key].push(oneLine[key])
              })
            })
            console.log(parsedData)
          }
        })
      })
    }
  }