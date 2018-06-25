var express = require('express');
const {connection} = require('../app.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/info', (req, res, next) => {
  const sql = 'SELECT id, title FROM survey_templates ORDER BY title';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
