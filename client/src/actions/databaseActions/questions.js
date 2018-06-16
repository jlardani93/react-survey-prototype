export function createQuestion(_surveyTemplateId, _questionNumber, _questionText, _questionType){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const params = `questionNumber=${_questionNumber}&questionText=${_questionText}&questionType=${_questionType}`;
    req.open('POST', '/api/surveyTemplate/question/create', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send(params);
  })
  //Creates entry in JOIN table between survey_templates and survey_questions
  .then( response => {
    return new Promise ((resolve, reject) => {
      const surveyQuestionId = response.insertId;
      const req = new XMLHttpRequest();
      const params = `surveyTemplateId=${_surveyTemplateId}&surveyQuestionId=${surveyQuestionId}`;
      req.open('POST', '/api/surveyTemplate/question/join', true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
          console.log(req.responseText);
          resolve(JSON.parse(req.responseText));
        }
      }
      req.send(params);
    })
  })
}

export function getSurveyQuestions(_surveyTemplateId){
  return new Promise((resolve, reject) => {
    console.log("logging parameters in getSurveyQuestions promise:", _surveyTemplateId);
    const req = new XMLHttpRequest();
    req.open('GET', `/api/questions/info/${_surveyTemplateId}`, true);
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200){
        resolve(JSON.parse(req.responseText))
      }
    }
    req.send();
  })
}
