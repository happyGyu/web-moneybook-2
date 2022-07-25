import query from '../db/query';

const transactionHistoryModel = {
  async findById(transactionHistoryId) {
    const [[transactionHistory]] = await query(
      `SELECT *
      FROM TransactionHistory
      WHERE ID = ?
      LIMIT 1;`,
      [transactionHistoryId],
    );
    return transactionHistory ?? null;
  },

  async findAllInPeriod(startDate, endDate) {
    const [transactionHistories] = await query(
      `SELECT T.id, T.title, T.isIncome, T.amount, T.date, T.paymentMethodId, P.title as paymentMethodTitle, T.categoryId, C.title as categoryTitle, C.color as categoryColor
      FROM TransactionHistory as T
      INNER JOIN PaymentMethod as P
      ON T.paymentMethodId = P.id
      INNER JOIN Category as C
      ON T.categoryId = C.id
      WHERE T.date BETWEEN ? AND ?;`,
      [startDate, endDate],
    );
    return transactionHistories;
  },

  async create({ title, date, isIncome, amount, categoryId, paymentMethodId }) {
    await query(
      `INSERT INTO TransactionHistory
      ( title, date, isIncome, amount, categoryId, paymentMethodId)
      VALUES ( ?, ?, ?, ?, ?, ? )`,
      [title, date, isIncome, amount, categoryId, paymentMethodId],
    );
  },

  async update(
    id,
    { title, date, isIncome, amount, categoryId, paymentMethodId },
  ) {
    await query(
      `UPDATE TransactionHistory
      SET title = ?, date = ?, isIncome = ?, amount = ?, categoryId = ?, paymentMethodId = ?
      WHERE ID =  ?`,
      [title, date, isIncome, amount, categoryId, paymentMethodId, +id],
    );
  },

  async remove(id) {
    await query(`DELETE FROM TransactionHistory WHERE ID = ?`, id);
  },
};

export default transactionHistoryModel;
