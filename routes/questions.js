var express = require('express');
const connection = require('../db_connection.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/info/:id', (req, res, next) => {
  const sql = 'SELECT survey_questions.* FROM templates_questions JOIN survey_questions ON (templates_questions.question_id = survey_questions.id) WHERE templates_questions.template_id = ? ORDER BY question_number';
  console.log("Querying database for survey questions");
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})


module.exports = router;
