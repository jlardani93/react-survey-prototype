var express = require('express');
const { connection } = require('../app.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// request:
// {
//   templateId:
//   teacherId:
//   surveys: [
//     {
//       templateId:
//       teacherId:
//       dateCompleted:
//       responses: [
//         {
//           questionId:
//           surveyId:
//           questionResponse:
//         }
//       ]
//     }
//   ]
// }


router.post('/create', (req, res, next) => {

  console.log('logging parameters');
  console.log(req.body);
  const {templateId, teacherId, dateEntered, surveys} = req.body;

  surveys.forEach( survey => {

    const sql1 = 'INSERT INTO surveys (survey_template_id, teacher_id, complete, date_entered) VALUES ( ?, ?, ?, ?)';
    connection.query(sql1, [templateId, teacherId, 1, new Date().toISOString().substring(0, 10)], (err, result) => {
      if (err) throw err;
      const surveyId = result.insertId;

      survey.responses.forEach( response => {
        const { questionId, questionResponse } = response;
        const sql2 = 'INSERT INTO responses (survey_id, question_id, response) VALUES ( ?, ?, ?)';
        connection.query(sql2, [surveyId, questionId, questionResponse], (err, result) => {
          if (err) throw err;
        })
      })
    })
  })
})

router.get('/info/:teacherId/:surveyTemplateId', (req, res, next) => {
  const { teacherId, surveyTemplateId } = req.params;
  console.log('logging parameters');
  console.log(req.params.teacherId, req.params.surveyTemplateId);
  const sql = "SELECT surveys.* FROM responses JOIN surveys ON (responses.survey_id = surveys.id) WHERE surveys.teacher_id = ? AND surveys.survey_template_id = ?"
  connection.query(sql, [teacherId, surveyTemplateId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
