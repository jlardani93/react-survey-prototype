//CREATES A NEW USER IN THE FIREBASE DATABASE
export function addUser(_username, _password, _role){
  const promise = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('POST', '/api/createUser', true);
    const params = `username=${_username}&password=${_password}&role=${_role}`;
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
      }
    }
    req.send(params);
  })
}
