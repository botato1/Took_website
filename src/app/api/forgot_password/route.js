import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/mysql_db';
import nodemailer from 'nodemailer';

const smtpTransport = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_ID,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { message: "이메일과 이름을 입력해주세요." }, 
        { status: 400 }
      );
    }

    console.log('비밀번호 재설정 요청:', { email, name });

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

    if (user.provider !== 'local') {
      return NextResponse.json(
        { message: `이 계정은 ${user.provider} 계정입니다. 해당 서비스에서 비밀번호를 재설정해주세요.` }, 
        { status: 400 }
      );
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000) + '';
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); 

    console.log('생성된 인증번호:', resetToken);

    await executeQuery({
      query: 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      values: [resetToken, resetTokenExpiry, user.id],
    });

    const mailOptions = {
      from: process.env.NODE_MAILER_ID,
      to: email,
      subject: '[TOOK] 비밀번호 재설정 인증번호',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4A6CF7;">TOOK</h1>
          </div>
          
          <h2 style="color: #333;">비밀번호 재설정 요청</h2>
          
          <p>안녕하세요, <strong>${user.name}</strong>님</p>
          
          <p>비밀번호 재설정을 요청하셨습니다. 아래 인증번호를 입력하여 새로운 비밀번호를 설정해주세요.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h3 style="color: #4A6CF7; font-size: 32px; margin: 0; letter-spacing: 5px; font-weight: bold;">${resetToken}</h3>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            • 이 인증번호는 <strong>15분간</strong> 유효합니다.<br>
            • 요청하지 않으셨다면 이 이메일을 무시해주세요.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            이 이메일은 TOOK 비밀번호 재설정 요청에 의해 자동 발송되었습니다.
          </p>
        </div>
      `,
      text: `TOOK 비밀번호 재설정\n\n안녕하세요, ${user.name}님\n\n비밀번호 재설정 인증번호: ${resetToken}\n\n이 코드는 15분간 유효합니다.`
    };

    console.log('메일 발송 시작...');

    const result = await new Promise((resolve, reject) => {
      smtpTransport.sendMail(mailOptions, (error, responses) => {
        if (error) {
          console.error('메일 발송 실패:', error);
          reject(error);
        } else {
          console.log('메일 발송 성공:', responses);
          resolve(responses);
        }
        smtpTransport.close();
      });
    });

    return NextResponse.json({
      message: "인증번호가 이메일로 발송되었습니다. 30분 내에 입력해주세요.",
      success: true,
      ...(process.env.NODE_ENV === 'development' && { debugToken: resetToken })
    });

  } catch (error) {
    console.error('비밀번호 재설정 요청 오류:', error);
    return NextResponse.json(
      { message: "비밀번호 재설정 요청 중 오류가 발생했습니다.", success: false }, 
      { status: 500 }
    );
  }
}