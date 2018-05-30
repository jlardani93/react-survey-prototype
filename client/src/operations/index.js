import * as emailOperations from './emailOperations'
import * as teacherOperations from './teacherOperations'
import * as userOperations from './userOperations'
import * as actions from  './../actions'

export const { sendInviteEmail, sendEmail } = emailOperations
export const { createTeacher, updateTeacher, getTeachers, getSchools} = teacherOperations
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
