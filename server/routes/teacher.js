var express = require('express');
const {connection} = require('../app.js');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.post('/invite', (req, res, next) => {
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

router.post('/create', (req, res, next) => {
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

router.post('/info', (req, res, next) => {
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

router.post('/update', (req, res, next) => {

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

router.get('/info/:id', (req, res, next) => {
  const sql = 'SELECT * FROM modules JOIN modules_teachers ON (modules.id = modules_teachers.module_id) JOIN teachers ON (teachers.id = modules_teachers.teacher_id) WHERE teachers.id = ?';
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

router.post('/module/join', (req, res, next) => {
  console.log("logging parameters");
  console.log(req.body.moduleId, req.body.teacherId);
  const { moduleId, teacherId } = req.body;
  const sql = 'INSERT INTO modules_teachers (module_id, teacher_id) VALUES ( ?, ? )';
  connection.query(sql, [moduleId, teacherId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

module.exports = router;
