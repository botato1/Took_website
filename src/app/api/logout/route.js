// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // NextResponse를 사용한 응답 생성
    const response = NextResponse.json(
      { message: "로그아웃 성공" },
      { status: 200 }
    );

    // 쿠키 삭제
    response.cookies.set({
      name: 'token',
      value: '',
      expires: new Date(0), // 즉시 만료
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그아웃 오류:', error);
    return NextResponse.json(
      { message: "로그아웃 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}