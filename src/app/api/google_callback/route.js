// src/app/api/auth/google_callback/route.js 파일 생성
import { executeQuery } from '@/lib/mysql_db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { message: "인증 코드가 없습니다." }, 
        { status: 400 }
      );
    }

    // 구글 토큰 요청
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
      }
    );

    const { access_token } = tokenResponse.data;

    // 구글 프로필 정보 요청
    const profileResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { sub, email, name, picture } = profileResponse.data;

    // 사용자 조회 또는 생성
    let users = await executeQuery({
      query: 'SELECT * FROM users WHERE email = ? OR (provider = ? AND provider_id = ?)',
      values: [email, 'google', sub],
    });

    let user;

    if (users.length === 0) {
      // 새 사용자 생성
      const result = await executeQuery({
        query: `
          INSERT INTO users (name, email, provider, provider_id) 
          VALUES (?, ?, ?, ?)
        `,
        values: [name, email, 'google', sub],
      });

      // 새로 생성된 사용자 조회
      users = await executeQuery({
        query: 'SELECT * FROM users WHERE id = ?',
        values: [result.insertId],
      });
    }

    user = users[0];

    // 이미 다른 방식으로 가입한 경우
    if (user.provider !== 'google' && !user.provider_id) {
      // image_url 필드 제거
      await executeQuery({
        query: 'UPDATE users SET provider_id = ? WHERE id = ?',
        values: [sub, user.id],
      });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // NextResponse 생성 및 쿠키 설정
    const response = NextResponse.redirect(new URL('/', req.url));
    
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
    console.error('구글 로그인 오류:', error);
    console.error(error.response?.data || error.message);
    // 오류 페이지로 리디렉션
    return NextResponse.redirect(new URL('/error?message=google-login-failed', req.url));
  }
}