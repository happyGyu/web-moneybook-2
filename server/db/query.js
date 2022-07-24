import pool from '.';

export default async function query(queryOptions) {
  const connection = await pool.getConnection();
  const queryResult = await connection.query(queryOptions);
  connection.release();
  return queryResult;
}
