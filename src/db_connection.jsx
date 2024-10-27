const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '2486', 
  database: 'MedAgendaDB' 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


