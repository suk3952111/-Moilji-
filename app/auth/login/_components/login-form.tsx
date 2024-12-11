'use client';

import { useFormState } from 'react-dom';
import { FormButton } from '../../_components/form-button';
import { userLogIn } from '../_lib/login';
import { LoginFormInput } from './login-form-input';

export const LoginForm = () => {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(userLogIn, initialState);
  return (
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
        <LoginFormInput errors={state?.errors} />
      </div>
      <FormButton disabled={false}>로그인</FormButton>
      {state?.message}
    </form>
  );
};
