import query from '../db/query';

const paymentMethodModel = {
  async findById(paymentMethodId) {
    const [paymentMethod] = await query(
      `SELECT id, title
      FROM PaymentMethod
      WHERE ID = ?
      LIMIT 1;`,
      [paymentMethodId],
    );
    return paymentMethod[0] ?? null;
  },

  async findAll() {
    const [paymentMethods] = await query(
      `SELECT id, title
      FROM PaymentMethod`,
    );
    return paymentMethods;
  },

  async create({ title }) {
    await query(`INSERT INTO PaymentMethod ( title ) VALUES ( ? )`, [title]);
  },

  async update(id, { title }) {
    await query(`UPDATE PaymentMethod SET title = ? WHERE ID = ?`, [title, id]);
  },

  async remove(id) {
    await query(`DELETE FROM PaymentMethod WHERE ID = ?`, [id]);
  },
};

export default paymentMethodModel;
