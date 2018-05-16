const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "justin"
})


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/database', (req, res) => {
  connection.query("SELECT username, email, role * FROM customers", (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'SELECT id, username, email, role FROM users WHERE username = ? AND password = ?'
  connection.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.get('/api/json', (req, res) => {
  res.send({
    head: {
      name: "Justin Lardani",
      language: "React"
    },
    body: {
      message: "You have successfully created your first Express API call!"
    }
  })
})

app.get('/api/school/info', (req, res) => {
  connection.query("SELECT DISTINCT school FROM teachers", (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})


app.post('/api/createUser', (req, res) => {
  console.log(req.body.username);
  res.send({ message: "We received your post" });
})

app.post('/api/teacher/create', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.name, req.body.school, req.body.email);
  const name = req.body.name;
  const school = req.body.school;
  const email = req.body.email;
  const sql = "INSERT INTO teachers (name, school, email) VALUES ( ? , ? , ?)"
  connection.query(sql, [name, school, email], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/teacher/info', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.school, req.body.name);
  console.log(typeof(req.body.school));
  const { school, name } = req.body;
  let sql = 'SELECT * FROM teachers';
  let params = [];

  if (school || name) sql += ' WHERE ';

  if (school && name) {
    sql += `school = ? AND name = ?`;
    params = [school, name];
  } else if (school) {
    sql += `school = ?`;
    params = [school];
  } else if (name) {
    sql += `name = ?`;
    params = [name];
  }

  console.log('params', params);

  connection.query(sql, params, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/checkEntry', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.table, req.body.column, req.body.value);
  const {table, column, value} = req.body
  const sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
  connection.query(sql, [value], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
