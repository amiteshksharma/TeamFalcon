const express = require('express');
const router = express.Router();
require('dotenv').config()
const fetch = require('node-fetch')

/* GET home page. */
router.get('/symptoms', function(req, res, next) {
  fetch(`https://healthservice.priaid.ch/symptoms?token=${process.env.SECRET_KEY}&format=json&language=en-gb`)
    .then(response => response.json())
    .then(data => {
      return res.send(data);
    })
    .catch(error => {
      console.log(error)
  })
});

module.exports = router;
