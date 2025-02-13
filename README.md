### 모읽지 (Moilji) 프로젝트 README
![마이페이지 _ 나의 모임 _ 참여 중인 모임](https://github.com/user-attachments/assets/d9556377-24df-4631-af0e-8750d0c05492)
```markdown
# 모읽지 (Moilji)

**모읽지(Moilji)**는 독서 모임과 커뮤니티 기능을 제공하는 플랫폼으로, 사용자들이 함께 책을 읽고 토론하며 성장할 수 있는 환경을 제공합니다. 본 프로젝트는 효율적이고 직관적인 사용자 경험을 목표로 개발되었습니다.

---

## **프로젝트 구조**

```plaintext
app
├─ auth
│  ├─ login
│  ├─ signup
│  └─ 기타 공용 컴포넌트 및 유틸
├─ bookmark
├─ mypage
├─ reviews
├─ utils
└─ _components
components
├─ ui (공용 UI 컴포넌트)
docker (Docker 설정)
lib (서버와의 통신 및 공용 함수)
mocks (테스트용 Mock 데이터)
public (정적 파일)
store (상태 관리)
```

자세한 구조는 [소스 코드](https://github.com/)를 참고하세요.

---

## **기술 스택**

### **Frontend**
- **Framework**: Next.js (앱 라우터 방식)
- **Language**: TypeScript
- **UI**: TailwindCSS
- **상태 관리**: Tanstack-query, Zustand
- **라이브러리**: react-calendar, react-datepicker

### **Backend**
- Node.js
- Swagger (API 문서화 및 테스트)
- CI/CD 자동 배포 환경 구축

### **DevOps**
- Docker
- Nginx

---

## **핵심 기능**

### 1. **독서 모임 관리**
- 독서 목표와 기간 설정
- 참여자 모집 및 관리
- 진행 상태를 나타내는 프로그래스 바

### 2. **채팅**
- 독서 모임 전용 단체 채팅방 제공

### 3. **알림**
- 모임 상태, 독서 완료 알림, 리뷰 작성 알림 등 제공

### 4. **사용자 통계 및 랭킹**
- 개인 및 모임 내 독서 통계
- 인기 도서 및 모임 랭킹

### 5. **마이페이지**
- 프로필 관리 (닉네임, 이메일, 이미지)
- 북마크 및 참여한 모임 관리

### 6. **기타**
- 온보딩 과정에서 사용자 선호 기반 추천
- 모임 내 토론 기능
- 출석 체크 및 독서 인증

---

## **설치 및 실행**

### **1. 클론**
```bash
git clone https://github.com/your-repository/moilji.git
cd moilji
```

### **2. 의존성 설치**
```bash
npm install
```

### **3. 개발 서버 실행**
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

---

## **주요 목표**

1. **OAuth 2.0**: 간편 로그인 및 인증
2. **일정 리마인더 기능**: 사용자 일정 관리 지원
3. **실시간 채팅**: 모임 내 실시간 소통

---

## **회의 및 진행 상황**

### **완료된 작업**
- 기술 스택 선정 및 프로젝트 구조 설정
- 독서 모임 관리 기본 기능 구현
- CI/CD 자동화 환경 구축

### **진행 중**
- 와이어프레임 및 기능 요구사항 반영
- 프론트/백엔드 API 연동 및 데이터 타입 정의

---

## **기여 방법**

1. 이슈를 확인하고 작업할 내용을 선택합니다.
2. 새로운 브랜치를 생성합니다.
3. 작업 내용을 커밋하고 PR(Pull Request)을 생성합니다.

---

## **문의**

### **팀 모읽지**
- **디자인**: 와이어프레임 설계, 사용자 경험 개선
- **프론트엔드**: UI 구현, 기능 개발
- **백엔드**: API 개발 및 데이터 처리

문의사항은 [Issue Tracker](https://github.com/)를 이용해 주세요.
```

이 README는 프로젝트의 목표, 기능, 기술 스택 및 협업 정보를 포함하여 포괄적으로 작성되었습니다. 필요에 따라 수정 및 추가 가능합니다! 😊
