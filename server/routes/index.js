const express = require('express');
const checkEntryRouter = require('./checkEntry.js');
const createUserRouter = require('./createUser.js');
const loginRouter = require('./login.js');
const moduleRouter = require('./module.js');
const questionsRouter = require('./questions.js');
const teacherRouter = require('./teacher.js');
const schoolRouter = require('./school.js');
const surveyRouter = require('./survey.js');
const surveyTemplateRouter = require('./surveyTemplate.js');
const surveyTemplatesRouter = require('./surveyTemplates.js');
const router = express.Router();

module.exports = {
  checkEntryRouter,
  createUserRouter,
  loginRouter,
  moduleRouter,
  questionsRouter,
  schoolRouter,
  surveyRouter,
  surveyTemplateRouter,
  surveyTemplatesRouter,
  teacherRouter
}
