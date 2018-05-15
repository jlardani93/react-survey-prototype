//CREATES A NEW USER IN THE FIREBASE DATABASE
export function createUser(_username, _password, _role){
  const promise = new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const params = `username=${_username}&password=${_password}&role=${_role}`;
    req.open('POST', '/api/createUser', true);

    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
      }
    }
    req.send(params);
  })
}

//SENDS USERNAME AND PASSWORD TO DATABASE AND TRIES TO LOGIN USERNAME
export function login(_username, _password){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const params = `username=${_username}&password=${_password}`

    req.open('POST', '/api/login', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send(params);
  })
}
