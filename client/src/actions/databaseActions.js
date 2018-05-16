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

//ALLOWS ADMIN TO ADD A NEW TEACHER SLOT TO THE DATABASE
export function createTeacher(_school, _name, _email){
  return new Promise((resolve, reject) => {
    console.log("logging parameters in promise");
    console.log(_school, _name, _email);
    const req = new XMLHttpRequest();
    const params = `school=${_school}&name=${_name}&email=${_email}`

    req.open('POST', '/api/teacher/create', true);
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

//CHECKS IF ENTRY ALREADY EXISTS IN DATABASE
export function onQueryResponse(_table, _column, _value){
  return new Promise((resolve, reject) => {
    console.log("checking if database contains value");
    console.log(_table, _column, _value);
    const req = new XMLHttpRequest();
    const params = `table=${_table}&column=${_column}&value=${_value}`

    req.open('POST', '/api/checkEntry', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(JSON.parse(req.responseText));
        if (JSON.parse(req.responseText).length === 0){
          resolve(false);
        } else {
          resolve(true);
        }
      }
    }
    req.send(params);
  })
}
