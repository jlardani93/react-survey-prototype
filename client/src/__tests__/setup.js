const mysql = require('mysql');
const connectionConfiguration = require('./../../../server/db_connection_test.js');
const connection = mysql.createConnection(connectionConfiguration);

function setupDatabase(done){
  console.log('setting up database');
  const sqlStatements = [

    `INSERT INTO users (username, role, password, email)
      VALUES ('admin','admin','admin','admin')`,

    `INSERT INTO teachers (user_id, school, name, email)
      VALUES (2, 'Seattle School District','Justin Lardani','jlardani93@gmail.com')`,

    `INSERT INTO modules (title)
      VALUES ('microbiology')`,

    `INSERT INTO survey_templates (title)
      VALUES ('general survey')`,

    `INSERT INTO survey_questions (question_number, question, type)
      VALUES (1, 'This is the first question', 0)`,

    `INSERT INTO templates_questions (template_id, question_id)
      VALUES (1, 1)`,

    `INSERT INTO survey_questions (question_number, question, type)
      VALUES (2, 'this is the second question', 1)`,

    `INSERT INTO templates_questions (template_id, question_id)
      VALUES (1, 2)`,

    `INSERT INTO modules_survey_templates (module_id, survey_template_id)
      VALUES (1, 1)`,

    `INSERT INTO modules_teachers (module_id, teacher_id)
      VALUES (1, 1)`
  ]

  const promises = sqlStatements.map(statement => {
    return connection.query(statement, (err, result) => {
      console.log("successfully updated database:", result);
      resolve();
    })
  });

  return Promise.all(promises)

}

function teardownDatabase(){
  console.log('tearing down database');
  const sqlStatements = [

    `TRUNCATE TABLE users`,

    `TRUNCATE TABLE teachers`,

    `TRUNCATE TABLE modules`,

    `TRUNCATE TABLE survey_templates`,

    `TRUNCATE TABLE survey_questions`,

    `TRUNCATE TABLE templates_questions`,

    `TRUNCATE TABLE modules_survey_templates`,

    `TRUNCATE TABLE modules_teachers`

  ]

  sqlStatements.forEach(statement => {
    connection.query(statement, (err, result) => {
      if (err) throw err;
      console.log(result);
    })
  })
}

module.exports = {
  setupDatabase,
  teardownDatabase
}
