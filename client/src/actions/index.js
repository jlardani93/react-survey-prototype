import * as databaseActions from './databaseActions'
import * as userActions from './userActions'

export const { createUser } = databaseActions;
export const { setUser } = userActions;

export function onQueryResponse(boolean, table, column, value, callback){
  return (dispatch) => databaseActions.onQueryResponse(table, column, value)
  .then(contains => {
    console.log("contains", contains);
    (contains === boolean) ? callback(true) : callback(false);
  })
}


export function login(username, password, loginCallback) {
  return (dispatch) => databaseActions.login(username, password)
  .then(userObject => {
    console.log(userObject);
    loginCallback(userObject);
  })
}

export function createTeacher(school, name, email, createTeacherCallback) {
  return (dispatch) => databaseActions.createTeacher(school, name, email)
  .then(response => {
    console.log("createTeacher response:", response);
    createTeacherCallback(response.affectedRow !== 0);
  })
}
