const express = require('express');
const router = express.Router();
require('dotenv').config()
const fetch = require('node-fetch')

/* GET home page. */
router.get('/symptoms', function(req, res, next) {
  // Dummy Route
});

module.exports = router;
