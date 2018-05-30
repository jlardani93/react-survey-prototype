import { databaseActions } from './../actions'

export function createSurvey(title, questions){
  return (dispatch) => databaseActions.createSurveyTemplate(title)
  .then(response => {
    console.log("createSurveyTemplate response:", response);
    questions.forEach(question => {
      dispatch(databaseActions.createQuestion(response.insertId, question.questionNumber, question.question, question.questionType)); 
    })
  })
}
