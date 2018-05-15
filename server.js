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
  connection.query("SELECT * FROM customers", (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
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


app.post('/api/createUser', (req, res) => {
  console.log(req.body.username);
  res.send({ message: "We received your post" });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
