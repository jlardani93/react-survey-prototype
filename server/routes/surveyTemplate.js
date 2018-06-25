var express = require('express');
const {connection} = require('../app.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/create', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.title);
  const { title } = req.body;
  const sql = 'INSERT INTO survey_templates (title) VALUES (?)';
  connection.query(sql, [title], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

router.post('/question/create', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.questionNumber, req.body.questionText, req.body.questionType);
  const { questionNumber, questionText, questionType } = req.body;
  const sql = 'INSERT INTO survey_questions (question_number, question, type) VALUES ( ?, ?, ?)';
  connection.query(sql, [questionNumber, questionText, questionType], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

router.post('/question/join', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.surveyTemplateId, req.body.surveyQuestionId);
  const { surveyTemplateId, surveyQuestionId } = req.body;
  const sql = 'INSERT INTO templates_questions (template_id, question_id) VALUES ( ?, ? )';
  connection.query(sql, [surveyTemplateId, surveyQuestionId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
