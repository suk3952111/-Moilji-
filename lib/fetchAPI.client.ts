import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || 'http://54.180.31.176:80';

// 클라이언트 환경에서 토큰 가져오기
function getToken(): string | undefined {
  return Cookies.get('token');
}

export async function fetchAPIClient(
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

  const url = `${BASE_URL}${endpoint}`;
  console.log('Request URL:', url);
  console.log('Request Options:', options);

  try {
    // const response = await fetch(url, options);
    const response = await fetch(url, {
      method: 'GET',
      headers: options.headers,
    });

    console.log('Response:', response);
    // if (!response.ok) {
    //   const errorBody = await response.text();
    //   console.error('Error Body:', errorBody);

    //   const error = {
    //     status: response.status,
    //     message: errorBody || 'Network response was not ok',
    //   };
    //   throw error;
    // }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error('API 호출 에러 (클라이언트):', error);
    throw error;
  }
}
