const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL.');
  connection.query('CREATE DATABASE IF NOT EXISTS meucasamento;', (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      process.exit(1);
    }
    console.log('Database "meucasamento" created or already exists.');
    connection.end();
  });
});
