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
    dispatch(sendInviteEmail(school, name, email, response.insertId));
    createTeacherCallback(response.affectedRow !== 0);
  })
}

export function updateTeacher(_teacherId, _school, _email, _name, _lastInviteEmailDate) {
  console.log("trying to update teacher");
  return (dispatch) => databaseActions.updateTeacher(_teacherId, _school, _email, _name, _lastInviteEmailDate)
  .then(response => {
    console.log("updateTeacher response:", response);
    //updateTeacherCallback();
  })
}

export function sendInviteEmail(school, name, email, teacherId) {
  return (dispatch) => databaseActions.sendInviteEmail(school, name, email)
  .then(response => {
    console.log("sendInviteEmail response:", response);
    //if e-mail sent succesfully ...
    const date = new Date().toISOString().slice(0, 10);
    console.log("about to dispatch updateTeacher");
    dispatch(updateTeacher(teacherId, school, email, name, date));
  })
}

export function getTeachers(getTeachersCallback, school = '', name = '') {
  return (dispatch) => databaseActions.getTeachers(school, name)
  .then(response => {
    console.log("getTeachers response:", response);
    getTeachersCallback(response);
  })
}

export function getSchools(getSchoolsCallback) {
  return (dispatch) => databaseActions.getSchools()
  .then(response => {
    console.log("getSchools response: ", response);
    getSchoolsCallback(response);
  })
}

export function sendEmail() {
  return (dispatch) => databaseActions.sendEmail()
  .then(response => {
    console.log(response);
  })
}
