const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "justin"
})

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  // const sqlStatement = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  const sqlStatement = "INSERT INTO customers (name, address) VALUES ?";
  const values = [
    ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ]
  connection.query(sqlStatement, [values], function(err, result) {
    if (err) throw err;
    console.log(result);
  })
  connection.query('SELECT * FROM customers', function(err, result, fields) {
    if (err) throw err;
    console.log("result", result);
    console.log("fields", fields);
  })
})
