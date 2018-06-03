import { databaseActions } from './../actions'

export function createModule(moduleTitle, surveyTemplateId, success){
  return (dispatch) => databaseActions.createModule(moduleTitle, surveyTemplateId)
  .then(response => {
    console.log("createModule response: ", response);
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
