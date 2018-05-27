//CREATES A NEW USER IN THE FIREBASE DATABASE
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

//Send e-mail on new teacher creation:
//Can send e-mail if teacher has not been sent an e-mail that day
//Can send e-mail if teacher requests to be sent e-mail with invitation to create account
//Needs e-mail, URL for registration, teacher's name, and school

export function sendInviteEmail(_school, _teacherName, _email) {
  return new Promise((resolve, reject) => {
    console.log("logging parameters in sendInviteEmail promise: ", _school, _teacherName, _email);
    const req = new XMLHttpRequest();
    const params = `school=${_school}&teacherName=${_teacherName}&email=${_email}`;
    req.open('POST', '/api/teacher/invite', true);

    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(req.responseText);
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
    const params = `school=${_school.toLowerCase()}&name=${_name.toLowerCase()}&email=${_email.toLowerCase()}`

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


//SEARCHES FOR TEACHERS BY SCHOOL AND NAME
export function getTeachers(_school = '', _name = ''){
  return new Promise((resolve, reject) => {
    console.log("logging parameters in promise");
    console.log(_school, _name);
    const req = new XMLHttpRequest();
    const params = `school=${_school}&name=${_name}`;

    req.open('POST', '/api/teacher/info', true);
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

//UPDATE TEACHER INFORMATION
export function updateTeacher(_id, _userId, _school, _email, _name, _lastInviteEmailDate){
  return new Promise((resolve, reject) => {
    console.log("logging parameters in promise");
    console.log(_school, _name);
    const req = new XMLHttpRequest();
    const params = `id=${_id}&userId=${_userId}&school=${_school.toLowerCase()}&email=${_email.toLowerCase()}&name=${_name.toLowerCase()}&date=${_lastInviteEmailDate}`;

    req.open('POST', '/api/teacher/update', true);
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

//GETS ALL SCHOOL NAMES FROM DATABASE
export function getSchools(){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/api/school/info', true);
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send();
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
        resolve(JSON.parse(req.responseText))
      }
    }
    req.send(params);
  })
}

export function sendEmail(){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/api/sendEmail', true);
    req.onreadystatechange = () => {
      if (req. readyState === 4&& req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send();
  })
}
