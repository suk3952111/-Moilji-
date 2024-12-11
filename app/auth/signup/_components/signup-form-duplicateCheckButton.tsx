'use client';

import React, { useState } from 'react';
import { checkDuplicate } from '../_lib/duplicate-check';
import { Button } from '@/components/ui/button';

interface CheckDuplicateButtonProps {
  type: 'email' | 'useName';
  value: string;
  setError: (message: string[]) => void; // string[] 타입으로 수정
  onSuccess: () => void;
  onFailure: () => void;
}

export const CheckDuplicateButton = ({
  type,
  value,
  setError,
  onSuccess,
  onFailure,
}: CheckDuplicateButtonProps) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); // 메시지 색상 상태 관리

  const handleCheck = async () => {
    if (!value) {
      setError(['값을 입력해주세요.']); // string[]로 전달
      setStatusMessage('');
      setMessageColor('');
      onFailure();
      return;
    }

    const result = await checkDuplicate(type, value);

    if (result.isDuplicate) {
      setError([result.message]); // string[]로 전달
      setStatusMessage(result.message);
      setMessageColor('text-red-500'); // 중복 메시지는 빨간색
      onFailure();
    } else {
      setError([]); // 에러를 초기화
      setStatusMessage(result.message);
      setMessageColor('text-green-500'); // 성공 메시지는 초록색
      onSuccess();
    }
  };

  return (
    <div>
      <Button
        onClick={handleCheck}
        type='button'
        className='px-2 py-1 bg-blue-500 text-white rounded'
      >
        중복 검사
      </Button>
      {statusMessage && (
        <p className={`mt-1 ${messageColor}`}>{statusMessage}</p>
      )}
    </div>
  );
};
