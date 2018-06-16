export function createSurveyTemplate(_title){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const params = `title=${_title}`;
    req.open('POST', '/api/surveyTemplate/create', true);
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
