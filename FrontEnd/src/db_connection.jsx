const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '2386', 
  database: 'MedAgendaDB' 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


