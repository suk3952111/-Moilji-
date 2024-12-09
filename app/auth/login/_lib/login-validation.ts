import { z } from 'zod';

export const validateLoginData = (formData: FormData) => {
  const LoginSchema = z.object({
    userName: z.string().min(1, { message: '이름을 입력해 주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
  });

  const formValues = {
    userName: formData.get('userName'),
    password: formData.get('password'),
  };

  const result = LoginSchema.safeParse(formValues);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
