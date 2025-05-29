// src/app/api/reset_password/route.js
import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/mysql_db';
import bcrypt from 'bcryptjs';

export async function PUT(req) {
  try {
    const { email, resetCode, newPassword } = await req.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { message: "모든 필드를 입력해주세요." }, 
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "비밀번호는 최소 6자 이상이어야 합니다." }, 
        { status: 400 }
      );
    }

    console.log('비밀번호 재설정 시도:', { email, resetCode });
    const users = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > NOW()',
      values: [email, resetCode],
    });

    if (users.length === 0) {
      console.log('유효하지 않은 토큰 또는 만료됨');
      return NextResponse.json(
        { message: "유효하지 않거나 만료된 인증코드입니다." }, 
        { status: 400 }
      );
    }

    const user = users[0];
    console.log('토큰 검증 성공, 사용자:', user.email);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('비밀번호 해싱 완료');

    await executeQuery({
      query: 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      values: [hashedPassword, user.id],
    });

    console.log('비밀번호 업데이트 완료');

    return NextResponse.json({
      message: "비밀번호가 성공적으로 변경되었습니다.",
      success: true,
      ...(process.env.NODE_ENV === 'development' && { debugInfo: '비밀번호 변경 완료' })
    });

  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    return NextResponse.json(
      { message: "비밀번호 재설정 중 오류가 발생했습니다.", success: false }, 
      { status: 500 }
    );
  }
}

export async function POST(req) {
  return PUT(req);
}