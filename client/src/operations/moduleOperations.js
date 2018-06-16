import { databaseActions } from './../actions'

export function createModule(moduleTitle, surveyTemplateId, success){
  return (dispatch) => databaseActions.createModule(moduleTitle)
  .then(response => {
    console.log("createModule response: ", response);
    dispatch(addSurveyTemplateToModule(response.insertId, surveyTemplateId, success));
  })
}

export function addSurveyTemplateToModule(moduleId, surveyTemplateId, success){
  return (dispatch) => databaseActions.addSurveyTemplateToModule(moduleId, surveyTemplateId)
  .then(response => {
    console.log("addSurveyTemplateToModule response: ", response);
    success(response);
  })
}

export function getModules(success){
  return (dispatch) => databaseActions.getModules()
  .then(response => {
    console.log("getModules response: ", response);
    success(response);
  })
}
