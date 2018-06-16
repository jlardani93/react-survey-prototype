import { databaseActions } from './../actions'

export function createSurveys(templateId, teacherId, surveys, success){
  console.log('data at operations:', templateId, teacherId, surveys);
  return (dispatch) => databaseActions.createSurveys(templateId, teacherId, surveys)
  .then(response => {
    console.log("success");
  })
}

export function getSurveyResponses(teacherId, surveyTemplateId, success){
  console.log('parameters at getSurveyResponses:', teacherId, surveyTemplateId);
  return (dispatch) => databaseActions.getSurveyResponses(teacherId, surveyTemplateId)
    .then( response => {
      success(response);
    })
}
