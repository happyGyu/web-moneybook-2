import query from '../db/query';

const categoryModel = {
  async findOne({ where, or }) {
    const whereCondition = Object.entries(where)
      .map(([col, value]) => `${col} = '${value}'`)
      .join(or ? 'OR' : 'AND');
    const [category] = await query(`
      SELECT id, title, color
      FROM Category
      ${whereCondition}
      LIMIT 1;
    `);
    return category[0] ?? null;
  },

  async findAll() {
    const [categories] = await query(`
    SELECT id, title, color
    FROM Category;
  `);
    return categories;
  },
};

export default categoryModel;
