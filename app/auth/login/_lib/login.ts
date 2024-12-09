'use server';

import { setCookie } from '../../_utils/cookie';
import { validateLoginData } from './login-validation';
import { fetchAPI } from '@/lib/fetchAPI';
import { redirect } from 'next/navigation';

export type State = {
  error?: {
    userName?: string[];
    password?: string[];
  };
  message: string | null;
};

export async function userLogIn(prevState: State, formData: FormData) {
  const validationResult = validateLoginData(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.errors,
      message: '다시 시도해 주세요.',
    };
  }

  const { userName, password } = validationResult.data!;

  const response = await fetchAPI('/api/auths/signIn', 'POST', {
    userName,
    password,
  });

  // console.log(response);

  if (!response.success) {
    return {
      message: `로그인 실패 ${response.message}`,
    };
  } else {
    setCookie('token', response.result.token, {
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 24 * 1,
    });
    redirect('/');
  }
}
