import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
});

export default pool;
