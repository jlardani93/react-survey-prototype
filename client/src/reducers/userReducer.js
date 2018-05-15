export default (state = {}, action) => {
  const { id, username, email, role, type } = action;
  switch (type) {
    case 'SET_USER':
      const newState = Object.assign({}, state, {id: id, username: username, email: email, role: role});
      return newState;
    default:
      return state;
  }
}
