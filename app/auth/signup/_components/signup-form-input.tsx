'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import EyeIcon from '../../_svg/EyeIcon';
import { CheckDuplicateButton } from './signup-form-duplicateCheckButton';
import { FormInputField } from '@/app/auth/_components/form-input-field';

interface SignupFormInputProps {
  errors?: {
    [key: string]: string[];
  };
  setIsEmailValid: (isValid: boolean) => void;
  setIsUserNameValid: (isValid: boolean) => void;
}

export const SignupFormInput = ({
  errors,
  setIsEmailValid,
  setIsUserNameValid,
}: SignupFormInputProps) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userNameError, setUserNameError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className='flex items-center space-x-2'>
        <FormInputField
          id='userName'
          name='userName'
          type='text'
          placeholder='이름을 입력하세요'
          disabled={pending}
          errors={errors?.userName || userNameError}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CheckDuplicateButton
          type='userName'
          value={userName}
          setError={setUserNameError}
          onSuccess={() => setIsUserNameValid(true)}
          onFailure={() => setIsUserNameValid(false)}
        />
      </div>
      <div className='flex items-center space-x-2'>
        <FormInputField
          id='email'
          name='email'
          type='email'
          placeholder='이메일을 입력하세요'
          errors={errors?.email || emailError}
          disabled={pending}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CheckDuplicateButton
          type='email'
          value={email}
          setError={setEmailError}
          onSuccess={() => setIsEmailValid(true)}
          onFailure={() => setIsEmailValid(false)}
        />
      </div>
      <FormInputField
        id='password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        placeholder='비밀번호를 입력하세요'
        errors={errors?.password}
        disabled={pending}
      />
      <button onClick={togglePasswordVisibility} type='button'>
        <EyeIcon
          className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
        />
      </button>
      <FormInputField
        id='confirmPassword'
        name='confirmPassword'
        type={showPassword ? 'text' : 'password'}
        placeholder='비밀번호를 다시 입력하세요'
        errors={errors?.confirmPassword}
        disabled={pending}
      />
      <button onClick={togglePasswordVisibility} type='button'>
        <EyeIcon
          className={`transition-all duration-300 h-6 w-6 ${showPassword ? 'text-gray-700' : 'text-gray-400'}`}
        />
      </button>
    </div>
  );
};
