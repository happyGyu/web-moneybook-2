const pool = require('../db');

async function findAll() {
  const connection = await pool.getConnection();
  const [categories] = await connection.query(`
        SELECT C.id, C.title, C.color
        FROM Category as C
    `);
  return categories;
}

module.exports = {
  findAll,
};
