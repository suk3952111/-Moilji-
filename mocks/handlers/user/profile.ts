import { HttpResponse, http } from 'msw';

const User = {
  userId: 1,
  userName: '테스트1',
  email: 'aa@test.com',
  profile: '',
};

const getProfile = http.get('/api/profile', () => {
  return HttpResponse.json(User);
});

const updateProfile = http.put('/api/auths/edit/user', async ({ request }) => {
  const formData = await request.formData();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token || !formData) {
    return HttpResponse.json({ message: '프로필 수정 실패' }, { status: 401 });
  }
  const userName = formData.get('userName');
  const profile = formData.get('profile');
  if (userName) {
    User.userName = userName as string;
  }
  if (profile) {
    // 임시 이미지 설정
    User.profile = '/heart.png';
  }
  return HttpResponse.json(
    { message: '프로필 수정 완료', user: User },
    { status: 200 },
  );
});

export const myProfile = [getProfile, updateProfile];
