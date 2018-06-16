import * as emailOperations from './emailOperations'
import * as moduleOperations from './moduleOperations'
import * as surveyOperations from './surveyOperations'
import * as surveyTemplateOperations from './surveyTemplateOperations'
import * as teacherOperations from './teacherOperations'
import * as userOperations from './userOperations'
import * as actions from  './../actions'

export const { sendInviteEmail, sendEmail } = emailOperations
export const { createModule, getModules, addSurveyTemplateToModule } = moduleOperations
export const { createSurveys, getSurveyResponses } = surveyOperations
export const { createSurvey, getSurveyTemplates, getSurveyQuestions } = surveyTemplateOperations
export const { createTeacher, addModule, updateTeacher, getTeacher, getTeachers, getSchools} = teacherOperations
export const { createUser, login} = userOperations
export const { databaseActions, setUser} = actions

export function onQueryResponse(table, column, value, callback){
  console.log(table, column, value);
  return (dispatch) => databaseActions.onQueryResponse(table, column, value)
  .then((response) => {
    console.log("response", response);
    (response.length !== 0) ? callback(true, response) : callback(false);
  })
}
