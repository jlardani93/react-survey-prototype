const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const CREDENTIALS = require('./__EMAIL__.js')
const { user, pass } = CREDENTIALS.CREDENTIALS;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "justin"
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
})

app.get('/api/sendEmail', (req, res) => {
  const mailOptions = {
    from: user,
    to: 'jlardani93@gmail.com',
    subject: 'test email',
    html: 'test email'
  }
  console.log("sending email");
  console.log(CREDENTIALS);
  console.log(user, pass);

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
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

//SEND ACCOUNT INVITATION EMAIL TO TEACHER
app.post('/api/teacher/invite', (req, res) => {
  const { school, teacherName, email } = req.body;
  console.log(school, teacherName, email );
  const mailOptions = {
    from: user,
    to: email,
    subject: 'CreositySpace Survey Portal Invite',
    html: `<p>Welcome to CreositySpace, ${teacherName}</p>
           <p>Follow the following link to create an account on our survey portal: localhost:3000/#/teacher/register</p>
           <p>Use the following information to create your account:<p>
           <p>Name: ${teacherName}</p>
           <p>School: ${school}</p>
           <p>Email: ${email}</p>`
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(info.response);
    }
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
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  console.log("logging parameters", username, password, email, role);
  const sql = "INSERT INTO users (username, role, password, email) VALUES ( ?, ?, ?, ?)"
  connection.query(sql, [username, role, password, email], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
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

app.post('/api/teacher/update', (req, res) => {

  //FILTERS SET OF PARAMETERS DOWN TO ONLY VALID VALUES
  const { school, email, name } = req.body;
  const parameters = { user_id: req.body.userId, school, email, name, last_invite_sent: req.body.date };
  const id = req.body.id;
  const originalKeys = Object.keys(parameters);
  originalKeys.forEach( key => {
    if (!parameters[key] || parameters[key] === '') {
      delete parameters[key];
    }
  })

  const newKeys = Object.keys(parameters);
  let args = Object.values(parameters);
  args.push(id);

  console.log("logging parameters at /api/teacher/update: ", parameters);
  console.log("logging arguments: ", args);

  //CONSTRUCTS SQL STATEMENT
  let sql = `UPDATE teachers SET `;

  for (let i = 0; i < newKeys.length; i++){
    let sqlSegment = (i > 0) ? ', ' : '';
    sqlSegment += `${newKeys[i]} = ?`;
    sql += sqlSegment;
  }

  sql += ` WHERE id = ?`
  console.log(sql);
  console.log(args);

  connection.query(sql, args, (err, result) => {
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

app.post('/api/surveyTemplate/create', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.title);
  const { title } = req.body;
  const sql = 'INSERT INTO survey_templates (title) VALUES (?)';
  connection.query(sql, [title], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/surveyTemplate/question/create', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.questionNumber, req.body.questionText, req.body.questionType);
  const { questionNumber, questionText, questionType } = req.body;
  const sql = 'INSERT INTO survey_questions (question_number, question, type) VALUES ( ?, ?, ?)';
  connection.query(sql, [questionNumber, questionText, questionType], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.post('/api/surveyTemplate/question/join', (req, res) => {
  console.log("logging parameters");
  console.log(req.body.surveyTemplateId, req.body.surveyQuestionId);
  const { surveyTemplateId, surveyQuestionId } = req.body;
  const sql = 'INSERT INTO templates_questions (template_id, question_id) VALUES ( ?, ? )';
  connection.query(sql, [surveyTemplateId, surveyQuestionId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
