var express = require('express');
const connection = require('../server.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/create', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.moduleTitle, req.body.surveyTemplateId);
  const { moduleTitle, surveyTemplateId } = req.body;
  const sql = 'INSERT INTO modules (title, survey_template_id) VALUES ( ?, ? )';
  connection.query(sql, [moduleTitle, surveyTemplateId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

router.get('/info', (req, res, next) => {
  const sql = 'SELECT id, title FROM modules ORDER BY title';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
