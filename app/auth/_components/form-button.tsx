'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

interface FormButtonProps {
  children: React.ReactNode;
  disabled: boolean;
}

export const FormButton = ({ children, disabled }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={disabled || pending}>
      {children}
    </Button>
  );
};
