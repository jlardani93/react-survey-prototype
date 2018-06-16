const express = require('express');
const connection = require('../db_connection.js');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'SELECT id, username, email, role FROM users WHERE username = ? AND password = ?'
  connection.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
