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

export function getTeacher(_teacherId){
  return new Promise((resolve, reject) => {
    console.log("loggin parameters in promise");
    console.log(_teacherId);
    const req = new XMLHttpRequest();
    req.open('GET', `/api/teacher/info/${_teacherId}`, true);
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200){
        console.log(req.responseText);
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send();
  })
}

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

export function joinModuleTeacher(_moduleId, _teacherId){
  return new Promise((resolve, reject) => {
    console.log(_moduleId, _teacherId);
    const req = new XMLHttpRequest();
    const params = `moduleId=${_moduleId}&teacherId=${_teacherId}`
    req.open('POST', '/api/teacher/module/join', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send(params);
  })
}
