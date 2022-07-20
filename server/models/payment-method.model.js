const pool = require('../db');

async function create({ title }) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(`INSERT INTO PaymentMethod ( title ) VALUES ( ? )`, [
    title,
  ]);
  await connection.commit();
  connection.release();
}

async function findAll() {
  const connection = await pool.getConnection();
  const [paymentMethods] = await connection.query(`
          SELECT P.id, P.title
          FROM PaymentMethod as P
      `);
  return paymentMethods;
}

module.exports = {
  create,
  findAll,
};
