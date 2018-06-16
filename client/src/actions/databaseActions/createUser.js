export function createUser(_username, _password, _email, _role){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const params = `username=${_username}&password=${_password}&role=${_role}&email=${_email}`;
    req.open('POST', '/api/createUser', true);

    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send(params);
  })
}
