const authorization = require('./authorization').pool;
const {SHA256} = require("sha2");


module.exports = {
    /*
    ALL FUNCTIONS SHOULD RETURN SOMETHING
    If status, see specific one at
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    */

   login : function(req, res){
  
        authorization.getConnection(function(err, conn){
            if (err) throw err
            
            let secret_key = [SHA256("keon135ntaik304ngaop3" + req.body.secret_key).toString("hex")];
            let sql = 'SELECT * FROM secrets WHERE password = ?';
            conn.query(sql, secret_key, function (err, results) {
                

                if(results.length > 0) {
                    req.session.loggedin = true;
                    res.redirect('/map');
                } else {
                    res.send('Incorrect secret!');
                }
                res.end();
                conn.release();
                

                if (err) throw err
            });
        });
    }
};