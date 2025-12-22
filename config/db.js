const mysql = require('mysql2');


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), 
});

db.connect((err) => {
  if (err) {
      console.log('DB ENV CHECK:', {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });
    console.log('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = db;
