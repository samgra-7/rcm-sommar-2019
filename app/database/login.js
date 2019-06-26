const mysqlssh = require('mysql-ssh');
const authorization = require('./authorization');
const {SHA256} = require("sha2");


module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

   login : function(req, res){
  
    let auth = authorization.Authorization;
    auth.increaseMutex();


    // ssh to database server and then connect to db
    mysqlssh.connect(auth.ssh, auth.database).then(client => {
        
        let secret_key = [SHA256(req.body.secret_key).toString("hex")];
        let sql = 'SELECT * FROM secrets WHERE password = ?';

        client.query(sql, secret_key, function (err, results) {
            if (err) throw err
            console.log(results);
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
}
};