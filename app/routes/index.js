var express = require('express');
var router = express.Router();
var login = require('../database/login');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'RCM' });
});

router.get('/map', function(req, res, next) {
  res.render('login', { title: 'RCM'});
})

router.get('/graph', function(req, res, next) {
  res.render('graph', { title: 'RCM' });
});

router.post('/', function(req, res) {
    login.login(req, res);
});




module.exports = router;
