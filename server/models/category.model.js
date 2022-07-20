const pool = require('../db');

async function findAll() {
  const connection = await pool.getConnection();
  const [categories] = await connection.query(`
        SELECT C.id, C.title, C.color
        FROM Category as C
    `);
  connection.release();
  return categories;
}

module.exports = {
  findAll,
};
