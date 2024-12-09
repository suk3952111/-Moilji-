import Cookies from 'js-cookie';
import { cookies as serverCookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'http://54.180.31.176';

// 쿠키 가져오기 (클라이언트/서버 환경 구분)
function getToken(): string | undefined {
  if (typeof window !== 'undefined') {
    // 클라이언트 환경
    return Cookies.get('token');
  } else {
    // 서버 환경
    const cookieStore = serverCookies();
    return cookieStore.get('token')?.value;
  }
}

export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: FormData | string | Record<string, unknown>,
) {
  const token = getToken();

  const headers: HeadersInit = {
    accept: '*/*',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(body &&
      !(body instanceof FormData) && { 'Content-Type': 'application/json' }),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const error = {
        status: response.status,
        message: (await response.text()) || 'Network response was not ok',
      };
      throw error;
    }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error('API 호출 에러:', error); // 로깅 추가 가능
    throw error;
  }
}
