import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'medagenda',
  password: 'MedAgenda123%',
  port: '3307',
  database: 'MedAgendaDB',
});

console.log('Connected to MySQL database');

export default connection;
