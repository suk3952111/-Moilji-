'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { userSignup } from '../_lib/signup';
import { SignupFormInput } from './signup-form-input';
import { FormButton } from '@/app/auth/_components/form-button';

export const SignupForm = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userSignup, initialState);

  // 중복 확인 상태 관리
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);

  // 모든 검사가 통과되었는지 확인
  const isFormValid = isEmailValid && isUserNameValid;

  useEffect(() => {
    fetch('http://54.180.31.176/api/auths/check/useName?param=test1111')
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <SignupFormInput
          errors={state?.errors}
          setIsEmailValid={setIsEmailValid}
          setIsUserNameValid={setIsUserNameValid}
        />
      </div>
      <FormButton disabled={!isFormValid}>회원가입</FormButton>
      {state?.message}
    </form>
  );
};
