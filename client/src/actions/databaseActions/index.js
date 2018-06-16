import { onQueryResponse } from './checkEntry'
import { createUser } from './createUser'
import { login } from './login'
import { createModule, getModules } from './module'
import { createQuestion, getSurveyQuestions } from './questions'
import { createSurveyTemplate } from './surveyTemplate'
import { getSurveyTemplates } from './surveyTemplates'
import { getSchools } from './school'
import { createTeacher, getTeacher, getTeachers, joinModuleTeacher, sendInviteEmail, updateTeacher } from './teacher'



const dbActions = {
  createModule,
  createQuestion,
  createSurveyTemplate,
  createTeacher,
  createUser,
  getModules,
  getSchools,
  getSurveyQuestions,
  getSurveyTemplates,
  getTeacher,
  getTeachers,
  joinModuleTeacher,
  login,
  onQueryResponse,
  sendInviteEmail,
  updateTeacher
}

export default dbActions;
