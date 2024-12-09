import React from 'react';
import { Input } from '@/components/ui/input';

interface FormInputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errors: string[] | undefined;
  disabled: boolean;
}

export const FormInputField = ({
  id,
  name,
  type,
  placeholder,
  errors,
  disabled,
}: FormInputFieldProps) => (
  <div>
    <Input
      id={id}
      name={name}
      type={type}
      required
      placeholder={placeholder}
      disabled={disabled}
    />
    {errors && (
      <div>
        {errors.map((error: string) => (
          <p key={error} className='text-rose-500'>
            {error}
          </p>
        ))}
      </div>
    )}
  </div>
);
