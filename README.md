# Took_website
# Took - 혁신적인 광고형 자판기 솔루션

> 창업 프로그램 프로젝트 - 광고주와 소비자를 연결하는 신개념 마케팅 플랫폼 웹사이트

<br/>

## 📌 프로젝트 소개

TOOK는 광고형 자판기를 통해 광고주와 소비자 모두에게 가치를 제공하는 혁신적인 광고 솔루션 플랫폼입니다. 
본 웹사이트는 **창업 프로그램 참여 과정에서 실제 서비스 개발 경험을 위해 제작**되었습니다.

### 프로젝트 의의
- 실제 창업 아이템을 웹 서비스로 구현한 경험
- Next.js 15 최신 기술 스택 학습
- 풀스택 개발 (Frontend + Backend + DB) 경험
- 팀 프로젝트 협업 경험

### 주요 특징
- 광고 솔루션 소개 및 문의 시스템
- 반응형 디자인 (모바일/태블릿/데스크톱 대응)
- 다크 모드 지원
- 사용자 인증 시스템 (회원가입/로그인)
- 실시간 문의 폼

<br/>

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15.3.0 (React 19)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.1.3
- **UI Components**: Lucide React (아이콘)
- **Theme**: next-themes (다크모드)
- **Animation**: AOS (Animate On Scroll)

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MySQL 2
- **Authentication**: JWT (jsonwebtoken) + bcrypt

### Additional Services
- **Form Handling**: Formspree
- **Email**: Nodemailer
- **HTTP Client**: Axios

<br/>

## 📂 프로젝트 구조

```
Took_website/
├── public/
│   └── images/              # 이미지 리소스
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # 메인 페이지
│   │   ├── about/           # 소개 페이지
│   │   ├── support/         # 고객지원
│   │   ├── contact/         # 문의하기
│   │   ├── login/           # 로그인
│   │   └── api/             # API Routes
│   └── components/          # 재사용 컴포넌트
├── .env                     # 환경변수 (로컬)
├── package.json
└── README.md
```

<br/>

## 🚀 로컬 실행 방법

### 1. 사전 요구사항
- Node.js 20 이상
- MySQL 설치 및 실행
- npm 또는 yarn

### 2. 설치

```bash
# 저장소 클론
git clone https://github.com/botato1/Took_website.git
cd Took_website

# 의존성 설치
npm install
```

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# Database
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=took_db

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Formspree (문의 폼)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id

# Email (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 4. 데이터베이스 설정

```sql
-- MySQL 데이터베이스 생성
CREATE DATABASE took_db;

-- 사용자 테이블 생성
USE took_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. 실행

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

서버 실행 후 브라우저에서 `http://localhost:3000` 접속

<br/>

## 📱 주요 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | 서비스 소개 및 주요 기능 안내 |
| About | `/about` | 회사 소개 및 비전 |
| Support | `/support` | 고객 지원 및 FAQ |
| Contact | `/contact` | 문의하기 폼 |
| 로그인 | `/login` | 사용자 로그인 |
| 회원가입 | `/signup` | 신규 회원가입 |

<br/>

## 🎨 주요 기능

### ✅ 구현 완료
- [x] 반응형 레이아웃
- [x] 다크모드 지원
- [x] 메인 페이지 슬라이더
- [x] 네비게이션 메뉴
- [x] 회원가입/로그인 UI
- [x] JWT 기반 인증 시스템
- [x] MySQL 데이터베이스 연동
- [x] 문의 폼 UI

### 🚧 진행 예정
- [ ] 배포 (Vercel)
- [ ] 클라우드 DB 연결 (PlanetScale)
- [ ] Formspree API 연동
- [ ] 관리자 대시보드
- [ ] 광고 문의 관리 시스템

<br/>

## 🌐 도메인 및 배포

### 도메인
- **구매 이력**: 가비아를 통해 도메인 구매 (현재 만료)
- **현재 상태**: 로컬 환경에서만 실행 가능

창업 프로그램 진행 당시 도메인을 구매하여 실제 서비스 런칭을 준비했으나, 프로그램 종료 후 도메인 갱신을 진행하지 않았습니다.

<br/>

## 📦 로컬 실행

## 👥 프로젝트 정보

- **목적**: 창업 프로그램 실제 서비스 개발 경험
- **기간**: 2024년 창업 프로그램 기간 중
- **팀**: TOOK 창업팀
- **현재 상태**: 개발 완료, 로컬 환경에서 실행 가능

<br/>

## 📝 개발 노트

### 기술적 도전
- Next.js 15의 최신 App Router 구조 학습
- TypeScript를 활용한 타입 안정성 확보
- JWT 기반 인증 시스템 직접 구현
- 반응형 디자인 및 다크모드 구현

### 배운 점
- 실제 서비스를 위한 웹사이트 제작 경험
- 프론트엔드와 백엔드의 통합 개발
- 데이터베이스 설계 및 연동
- 사용자 인증 보안 처리

<br/>

## 📄 라이선스

이 프로젝트는 TOOK 창업팀의 소유이며, 상업적 목적으로 제작되었습니다.

<br/>

## 📞 문의

프로젝트 관련 문의: [awd384@naver.com](mailto:awd384@naver.com)

---

**Made with ❤️ by TOOK Team**
