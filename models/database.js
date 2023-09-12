const mysql = require('mysql2/promise');

async function query(sql) {
  const connection = await mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10645678',
    password: 'SIGaLgy2Z1',
    database: 'sql10645678'
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