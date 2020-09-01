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

router.post('/diagnosis', function(req, res, next) {
  const symptoms = req.body.Symptoms;
  const jsonify = JSON.stringify(symptoms)
  const gender = req.body.Gender;
  const year = req.body.Age ? req.body.Age : 2000;

  fetch(`https://healthservice.priaid.ch/diagnosis?symptoms=${jsonify}&gender=${gender}&year_of_birth=${year}&token=${process.env.SECRET_KEY}&format=json&language=en-gb`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      return res.send(data);
    })
    .catch(error => {
      console.log(error)
  })
});

module.exports = router;
