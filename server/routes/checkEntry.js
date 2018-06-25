var express = require('express');
const {connection} = require('../app.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.table, req.body.column, req.body.value);
  const {table, column, value} = req.body
  const sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
  connection.query(sql, [value], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
