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

export function getSurveyTemplates(success){
  return (dispatch) => databaseActions.getSurveyTemplates()
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
