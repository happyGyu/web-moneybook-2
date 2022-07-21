import pool from '../db';

async function create({ title }) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(`INSERT INTO PaymentMethod ( title ) VALUES ( ? )`, [
    title,
  ]);
  await connection.commit();
  connection.release();
}

async function update({ id, title }) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(`UPDATE PaymentMethod SET title = ? WHERE ID = ?`, [
    title,
    id,
  ]);
  await connection.commit();
  connection.release();
}

async function remove({ id }) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(`DELETE FROM PaymentMethod WHERE ID = ?`, [id]);
  await connection.commit();
  connection.release();
}

async function findById(id) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  const [paymentMethod] = await connection.query(
    `SELECT * FROM PaymentMethod WHERE ID = ?`,
    [id],
  );
  await connection.commit();
  connection.release();
  return 0 < paymentMethod.length ? paymentMethod[0] : null;
}

async function findAll() {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  const [paymentMethods] = await connection.query(`
          SELECT P.id, P.title
          FROM PaymentMethod as P
      `);
  await connection.commit();
  connection.release();
  return paymentMethods;
}

export default {
  create,
  update,
  remove,
  findAll,
  findById,
};
