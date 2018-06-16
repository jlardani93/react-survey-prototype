var express = require('express');
const connection = require('../db_connection.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/info', (req, res, next) => {
  connection.query("SELECT DISTINCT school FROM teachers", (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router; 
