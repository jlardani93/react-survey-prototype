import { databaseActions } from './../actions'
import { sendInviteEmail } from './emailOperations'

export function createTeacher(school, name, email, createTeacherCallback) {
  return (dispatch) => databaseActions.createTeacher(school, name, email)
  .then(response => {
    console.log("createTeacher response:", response);
    dispatch(sendInviteEmail(school, name, email, response.insertId));
    createTeacherCallback(response.affectedRow !== 0);
  })
}

export function addModule(moduleId, teacherId, success){
  return (dispatch) => databaseActions.joinModuleTeacher(moduleId, teacherId)
  .then(response => {
    console.log("addModule response: ", response);
    success(response);
  })
}

export function updateTeacher(_teacherId, _school, _email, _name, _lastInviteEmailDate) {
  console.log("trying to update teacher");
  return (dispatch) => databaseActions.updateTeacher(_teacherId, '', _school, _email, _name, _lastInviteEmailDate)
  .then(response => {
    console.log("updateTeacher response:", response);
    //updateTeacherCallback();
  })
}

export function getTeacher(success, teacherId){
  return (dispatch) => databaseActions.getTeacher(teacherId)
  .then(response => {
    console.log("getTeacher response: ", response);
    success(response);
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
