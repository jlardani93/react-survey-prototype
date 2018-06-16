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
