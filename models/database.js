const mysql = require('mysql2/promise');

async function query(sql) {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'vertrigo',
    database: 'produtinhos'
  });

  try {
    const [rows] = await connection.execute(sql);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.end(); // Feche a conexão após a execução da consulta
      console.log('Banco de dados desconectado');
    }
  }
}

module.exports = { query };