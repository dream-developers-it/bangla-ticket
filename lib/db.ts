import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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