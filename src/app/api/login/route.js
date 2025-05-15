// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { executeQuery } from '@/lib/mysql_db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 필수 필드 검증
    if (!email || !password) {
      return NextResponse.json(
        { message: "이메일과 비밀번호는 필수입니다." }, 
        { status: 400 }
      );
    }

    // 사용자 조회
    const users = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ?',
      values: [email],
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "이메일 또는 비밀번호가 올바르지 않습니다." }, 
        { status: 401 }
      );
    }

    const user = users[0];

    // 소셜 로그인 사용자는 일반 로그인 불가
    if (user.provider !== 'local') {
      return NextResponse.json(
        { message: `이 계정은 ${user.provider} 계정으로 로그인해주세요.` }, 
        { status: 400 }
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "이메일 또는 비밀번호가 올바르지 않습니다." }, 
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // 사용자 정보 반환 (비밀번호 제외)
    const { password: _, ...userWithoutPassword } = user;

    // NextResponse로 응답 및 쿠키 설정
    const response = NextResponse.json(
      { message: "로그인 성공", user: userWithoutPassword, token },
      { status: 200 }
    );

    // 쿠키 설정
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60, // 1일
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그인 오류:', error);
    return NextResponse.json(
      { message: "로그인 중 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}