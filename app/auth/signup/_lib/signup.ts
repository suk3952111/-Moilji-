'use server';

import { validateSignupData } from './signup-validation';
import { fetchAPIServer } from '@/lib/fetchAPI.server';
import { redirect } from 'next/navigation';

export type State = {
  error?: {
    userName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message: string | null;
};

export async function userSignup(prevState: State, formData: FormData) {
  const validationResult = validateSignupData(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.errors,
      message: '다시 시도해 주세요.',
    };
  }

  const { userName, email, password } = validationResult.data!;

  const response = await fetchAPIServer('/api/auths/signUp', 'POST', {
    userName,
    email,
    password,
  });

  if (!response.success) {
    if (response.message === 'Duplicate email') {
      return {
        errors: {
          email: ['이메일이 이미 존재합니다.'],
        },
        message: '이메일 중복',
      };
    }

    return {
      message: `회원가입 실패: ${response.message}`,
    };
  }

  redirect('/auth/login');
}
