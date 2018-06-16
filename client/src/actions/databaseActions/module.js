export function createModule(_moduleTitle, _surveyTemplateId){
  return new Promise((resolve, reject) => {
    console.log(_moduleTitle, _surveyTemplateId);
    const req = new XMLHttpRequest();
    const params = `moduleTitle=${_moduleTitle}&surveyTemplateId=${_surveyTemplateId}`;
    req.open('POST', '/api/module/create', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send(params);
  })
}

export function getModules(){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/api/module/info', true)
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    }
    req.send();
  })
}
