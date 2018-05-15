export function setUser(userObject){
  const { id, username, email, role } = userObject;
  return {
    type: 'SET_USER',
    id,
    username,
    email,
    role
  }
}
