// src/app/api/test-login/route.js
export async function POST(req) {
    try {
      const body = await req.json();
      
      // 간단한 응답만 반환
      return new Response(
        JSON.stringify({ 
          message: "테스트 성공", 
          received: body
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('테스트 오류:', error);
      return new Response(
        JSON.stringify({ message: "테스트 오류 발생" }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }