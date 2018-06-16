
if (process.env.NODE_ENV === 'development') {
  console.log("============In DEVELOPMENT environment=============");
  require('dotenv').load();
} else {
  process.env.dbConfigPath = './db_connection.js';
}


//INITIALIZE DATABASE CONNECTION
const mysql = require('mysql');
const connectionConfiguration = require(process.env.dbConfigPath)
module.exports.connection = mysql.createConnection(connectionConfiguration);


const express = require('express');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const CREDENTIALS = require('./__EMAIL__.js')

const routes = require('./routes/index.js');

const app = express();
const {checkEntryRouter, createUserRouter, loginRouter, moduleRouter, questionsRouter, schoolRouter, surveyRouter, surveyTemplateRouter, surveyTemplatesRouter, teacherRouter} = routes;
const port = process.env.PORT || 5000;
const { user, pass } = CREDENTIALS.CREDENTIALS;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user,
    pass: pass
  }
})

app.use('/api/checkEntry', checkEntryRouter);
app.use('/api/createUser', createUserRouter);
app.use('/api/login', loginRouter);
app.use('/api/module', moduleRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/school', schoolRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/surveyTemplate', surveyTemplateRouter);
app.use('/api/surveyTemplates', surveyTemplatesRouter);
app.use('/api/teacher', teacherRouter);

module.exports.app = app;
module.exports.port = port;
