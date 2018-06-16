export function createSurveys(templateId, teacherId, surveys){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    const data = {
      templateId: templateId,
      teacherId: teacherId,
      surveys: surveys
    }
    console.log('data at databaseActions:', templateId, teacherId, surveys);
    const json = JSON.stringify(data);
    req.open('POST', '/api/survey/create', true);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
        resolve(JSON.parse(req.responseText))
      }
    }
    req.send(json);
  })
}

export function getSurveyResponses(teacherId, surveyTemplateId){
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', `/api/survey/info/${teacherId}/${surveyTemplateId}`, true);

    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        console.log(req.responseText);
        const response = {};
        JSON.parse(req.responseText).forEach( surveyResponse => {
          if (!response[surveyResponse.id]){
            response[surveyResponse.id] = [surveyResponse]
          } else {
            response[surveyResponse.id] = response[surveyResponse.id].concat([surveyResponse])
          }
        })
        resolve(response);
      }
    }
    req.send(null);
  })
}
