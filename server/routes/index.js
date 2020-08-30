var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  console.log('HERE')
  return res.send('Hello world');
});

module.exports = router;
