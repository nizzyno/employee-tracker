const mysql = require('mysql2');

// to hide password on a hidden file
require('dotenv').config();
const password = process.env.PASSWORD;

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: '1AppleMac$',
  database: 'employeetracker',
});

module.exports = db;

// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // Your MySQL username,
//     user: 'root',
//     // Your MySQL password
//     password: '1AppleMac$',
//     database: 'employeetracker',
//   },
//   console.log('Connected to the employee tracker database.')
// );

// module.exports = db;
