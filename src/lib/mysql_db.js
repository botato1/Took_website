import mysql from 'mysql2/promise';

export async function executeQuery({ query, values = [] }) {
  let connection;
  try {
    console.log('DB 연결 시도...');
    console.log('DB 설정:', {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER
    });
    
    // 데이터베이스 연결 설정
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    });

    console.log('DB 연결 성공!');
    
    // 쿼리 실행
    console.log('쿼리 실행:', query, values);
    const [results] = await connection.execute(query, values);
    console.log('쿼리 결과:', results);
    
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // 원래 오류를 그대로 전달
  } finally {
    // 연결 종료
    if (connection) {
      await connection.end();
      console.log('DB 연결 종료');
    }
  }
}