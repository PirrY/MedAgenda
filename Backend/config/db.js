import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'medagenda',
  password: 'MedAgenda123%',
  port: '3306',
  database: 'MedAgendaDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

export default connection;
