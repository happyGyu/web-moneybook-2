import pool from '../db';

const categoryModel = {
  async findAll() {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [categories] = await connection.query(`
          SELECT C.id, C.title, C.color
          FROM Category as C
      `);
    await connection.commit();
    connection.release();
    return categories;
  },
};

export default categoryModel;
