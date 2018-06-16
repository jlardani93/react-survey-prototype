import { databaseActions } from './../actions'

export function createSurvey(title, questions, success){
  return (dispatch) => databaseActions.createSurveyTemplate(title)
  .then(response => {
    console.log("createSurveyTemplate response:", response);
    success(response);
    questions.forEach(question => {
      dispatch(createQuestion(response.insertId, question.questionNumber, question.question, question.questionType));
    })
  })
}

export function getSurveyTemplates(success, moduleId){
  console.log("getSurveyTemplates argument: ", moduleId);
  return (dispatch) => databaseActions.getSurveyTemplates(moduleId)
  .then(response => {
    console.log("getSurveyTemplates response: ", response);
    success(response);
  })
}

export function createQuestion(insertId, questionNumber, question, questionType){
  return (dispatch) => databaseActions.createQuestion(insertId, questionNumber, question, questionType)
  .then(response => {
    console.log("createQuestion response: ", response);
  })
}

export function getSurveyQuestions(surveyTemplateId, success){
  return (dispatch) => databaseActions.getSurveyQuestions(surveyTemplateId)
  .then(response => {
    console.log("getSurveyQuestions response: ", response);
    success(response);
  })
}
