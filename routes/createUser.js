var express = require('express');
const connection = require('../server.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  console.log("logging parameters", username, password, email, role);
  const sql = "INSERT INTO users (username, role, password, email) VALUES ( ?, ?, ?, ?)"
  connection.query(sql, [username, role, password, email], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
