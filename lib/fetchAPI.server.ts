import { cookies as serverCookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'http://54.180.31.176';

// 서버 환경에서 토큰 가져오기
function getToken(): string | undefined {
  const cookieStore = serverCookies();
  return cookieStore.get('token')?.value;
}

export async function fetchAPIServer(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: FormData | string | Record<string, unknown>,
) {
  const token = getToken();

  const headers: HeadersInit = {
    accept: 'application/json;charset=UTF-8',
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
      return { error };
    }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error('API 호출 에러 (서버):', error);
    return { error };
  }
}
