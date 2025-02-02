import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'lottery_user',
  password: 'limon@123',
  database: 'lottery_db'
});

export async function query(text: string, params?: any[]) {
  const [rows] = await pool.execute(text, params);
  return rows;
}

// For direct queries without prepared statements
export async function directQuery(text: string) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(text);
    return rows;
  } finally {
    connection.release();
  }
}

export default pool; 