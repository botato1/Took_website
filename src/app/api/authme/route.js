// src/app/api/authme/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { executeQuery } from '@/lib/mysql_db';

export async function GET() {
  try {
    // 쿠키에서 토큰 가져오기 (await 추가)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: "인증되지 않았습니다." }, 
        { status: 401 }
      );
    }

    // 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // 쿠키 삭제
      const response = NextResponse.json(
        { message: "유효하지 않은 토큰입니다." }, 
        { status: 401 }
      );
      response.cookies.delete('token');
      return response;
    }

    // 사용자 정보 조회
    const users = await executeQuery({
      query: 'SELECT id, name, email, provider, created_at, updated_at FROM users WHERE id = ?',
      values: [decoded.id],
    });

    if (users.length === 0) {
      const response = NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." }, 
        { status: 404 }
      );
      response.cookies.delete('token');
      return response;
    }

    return NextResponse.json(users[0], { status: 200 });
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    return NextResponse.json(
      { message: "사용자 정보 조회 중 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}