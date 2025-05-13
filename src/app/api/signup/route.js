// app/api/signup/route.js
import { executeQuery } from '@/lib/mysql_db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // 필수 필드 검증
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "이름, 이메일, 비밀번호는 필수입니다." }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 이메일 중복 확인
    const existingUsers = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    });

    if (existingUsers.length > 0) {
      return new Response(
        JSON.stringify({ message: "이미 사용 중인 이메일입니다." }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const result = await executeQuery({
      query: 'INSERT INTO users (name, email, password, provider) VALUES (?, ?, ?, ?)',
      values: [name, email, hashedPassword, 'local'],
    });

    // 생성된 사용자 정보 조회
    const users = await executeQuery({
      query: 'SELECT id, name, email, provider, created_at, updated_at FROM users WHERE id = ?',
      values: [result.insertId],
    });

    const user = users[0];

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // 쿠키 설정
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60, // 1일
      path: '/',
    });

    return new Response(
      JSON.stringify({ 
        message: "회원가입 성공", 
        user,
        token
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('회원가입 오류:', error);
    return new Response(
      JSON.stringify({ message: "회원가입 중 오류가 발생했습니다." }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}