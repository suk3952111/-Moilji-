'use client';

import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import EyeIcon from '../../_svg/EyeIcon';
import { FormInputField } from '@/app/auth/_components/form-input-field';

interface FormInputProps {
  errors?: {
    [key: string]: string[];
  };
}

export const LoginFormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <FormInputField
        id='userName'
        name='userName'
        type='text'
        placeholder='이름을 입력하세요'
        errors={errors?.userName}
        disabled={pending}
      />
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
    </div>
  );
};
