import { databaseActions, setUser } from './../actions'

export function createUser(username, password, email, role, callback, userId){
  console.log(username, password, email, role, userId);
  return (dispatch) => databaseActions.createUser(username, password, email, role)
  .then((response) => {
    callback(response);
    if (response.affectedRows > 0) {
      databaseActions.updateTeacher(userId, response.insertId, '', '', '', '')
      .then(response => console.log(response));
    }
  })
}

export function login(username, password, loginCallback) {
  return (dispatch) => databaseActions.login(username, password)
  .then(userObject => {
    console.log(userObject);
    loginCallback(userObject);
  })
}
