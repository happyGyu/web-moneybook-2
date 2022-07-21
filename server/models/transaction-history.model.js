import pool from '../db';

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

async function findById(id) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  const [transactionHistory] = await connection.query(
    `SELECT * FROM TransactionHistory WHERE ID = ?`,
    [id],
  );
  await connection.commit();
  connection.release();
  return 0 < transactionHistory.length ? transactionHistory[0] : null;
}

async function findAllInPeriod(startDate, endDate) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  const [transactionHistories] = await connection.query(
    `SELECT T.id, T.title, T.isIncome, T.amount, T.date, T.paymentMethodId, P.title as paymentMethodTitle, T.categoryId, C.title as categoryTitle, C.color as categoryColor
    FROM TransactionHistory as T
    INNER JOIN PaymentMethod as P
    ON T.paymentMethodId = P.id
    INNER JOIN Category as C
    ON T.categoryId = C.id
    WHERE T.date BETWEEN ? AND ?;`,
    [startDate, endDate],
  );
  await connection.commit();
  connection.release();
  return transactionHistories;
}

export default {
  create,
  update,
  findById,
  findAllInPeriod,
};
