var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RCM' });
});


router.get('/graph', function(req, res, next) {
  res.render('graph', { title: 'RCM' });
});

module.exports = router;
