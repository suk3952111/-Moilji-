import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export function setCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>,
) {
  return cookies().set(key, value, options);
}
