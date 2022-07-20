const pool = require('../db');

async function create({
  title,
  date,
  isIncome,
  amount,
  categoryId,
  paymentMethodId,
}) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(
    `INSERT INTO TransactionHistory
    ( title, date, isIncome, amount, categoryId, paymentMethodId)
    VALUES ( ?, ?, ?, ?, ?, ? )`,
    [title, date, isIncome, amount, categoryId, paymentMethodId],
  );
  await connection.commit();
  connection.release();
}

async function update(
  id,
  { title, date, isIncome, amount, categoryId, paymentMethodId },
) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  await connection.query(
    `UPDATE TransactionHistory
    SET title = ?, date = ?, isIncome = ?, amount = ?, categoryId = ?, paymentMethodId = ?
    WHERE ID =  ? `,
    [title, date, isIncome, amount, categoryId, paymentMethodId, +id],
  );
  await connection.commit();
  connection.release();
}

module.exports = {
  create,
  update,
};
