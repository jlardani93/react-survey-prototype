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
