var express = require('express');
var router = express.Router();
var login = require('../database/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'RCM' });
});

router.get('/map', function(req, res, next) {
  // if(req.session.loggedin) {
    res.render('map', { title: 'RCM Map'});
  // } else {
    // res.send('Please login to view this page!');
  // }
  // res.end();
})

router.get('/graph', function(req, res, next) {
  // if(req.session.loggedin) {
    res.render('graph', { title: 'RCM Graphs' });
  // } else {
    // res.send('Please login to view this page!');
  // }
  // res.end();
});

router.post('/', function(req, res) {
    login.login(req, res);
});




module.exports = router;
