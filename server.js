const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;

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
  res.send({ message: "We received your post" }); 
})

app.listen(port, () => console.log(`Listening on port ${port}`));
