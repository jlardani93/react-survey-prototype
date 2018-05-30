import { databaseActions } from './../actions'
import { updateTeacher } from './teacherOperations'

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

export function sendEmail() {
  return (dispatch) => databaseActions.sendEmail()
  .then(response => {
    console.log(response);
  })
}
