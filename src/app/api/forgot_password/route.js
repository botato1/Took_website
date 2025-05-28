import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/mysql_db';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // 필수 필드 검증
    if (!email || !name) {
      return NextResponse.json(
        { message: "이메일과 이름을 입력해주세요." }, 
        { status: 400 }
      );
    }

    // 사용자 조회 (이름과 이메일 모두 일치하는지 확인)
    const users = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ? AND name = ?',
      values: [email, name],
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "입력하신 정보와 일치하는 계정을 찾을 수 없습니다." }, 
        { status: 404 }
      );
    }

    const user = users[0];

    // 소셜 로그인 계정은 비밀번호 재설정 불가
    if (user.provider !== 'local') {
      return NextResponse.json(
        { message: `이 계정은 ${user.provider} 계정입니다. 해당 서비스에서 비밀번호를 재설정해주세요.` }, 
        { status: 400 }
      );
    }

    // 재설정 토큰 생성 (6자리 랜덤 코드)
    const resetToken = crypto.randomBytes(3).toString('hex').toUpperCase();
    const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30분 후 만료

    // DB에 재설정 토큰 저장
    await executeQuery({
      query: 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      values: [resetToken, resetTokenExpiry, user.id],
    });

    // 이메일 발송 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 또는 다른 이메일 서비스
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // 앱 비밀번호 사용
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '[TOOK] 비밀번호 재설정 인증코드',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4A6CF7;">TOOK</h1>
          </div>
          
          <h2 style="color: #333;">비밀번호 재설정 요청</h2>
          
          <p>안녕하세요, ${user.name}님</p>
          
          <p>비밀번호 재설정을 요청하셨습니다. 아래 인증코드를 입력하여 새로운 비밀번호를 설정해주세요.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #4A6CF7; font-size: 24px; margin: 0; letter-spacing: 3px;">${resetToken}</h3>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            • 이 인증코드는 30분간 유효합니다.<br>
            • 요청하지 않으셨다면 이 이메일을 무시해주세요.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            이 이메일은 TOOK 비밀번호 재설정 요청에 의해 자동 발송되었습니다.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "인증코드가 이메일로 발송되었습니다. 30분 내에 입력해주세요.",
    });

  } catch (error) {
    console.error('비밀번호 재설정 요청 오류:', error);
    return NextResponse.json(
      { message: "비밀번호 재설정 요청 중 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}

// src/app/api/reset-password/route.js
export async function PUT(req) {
  try {
    const { email, resetCode, newPassword } = await req.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { message: "모든 필드를 입력해주세요." }, 
        { status: 400 }
      );
    }

    // 사용자 및 토큰 확인
    const users = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ? AND reset_token = ? AND reset_token_expiry > NOW()',
      values: [email, resetCode],
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "유효하지 않거나 만료된 인증코드입니다." }, 
        { status: 400 }
      );
    }

    const user = users[0];

    // 새 비밀번호 해싱
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트 및 토큰 삭제
    await executeQuery({
      query: 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      values: [hashedPassword, user.id],
    });

    return NextResponse.json({
      message: "비밀번호가 성공적으로 변경되었습니다.",
    });

  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    return NextResponse.json(
      { message: "비밀번호 재설정 중 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}