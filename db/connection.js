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
