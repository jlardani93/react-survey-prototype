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
