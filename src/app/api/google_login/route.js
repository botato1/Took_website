import { NextResponse } from 'next/server';

export async function GET() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;
  
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const scope = 'profile email';
  
  const url = `${googleAuthUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

  return NextResponse.redirect(url);
}