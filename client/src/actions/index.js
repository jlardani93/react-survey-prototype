import * as databaseActions from './databaseActions'
import * as userActions from './userActions'

export const { createUser } = databaseActions;
export const { setUser } = userActions;


export function login(username, password, loginCallback) {
  return (dispatch) => databaseActions.login(username, password)
  .then(userObject => {
    console.log(userObject);
    loginCallback(userObject); 
  })
}
