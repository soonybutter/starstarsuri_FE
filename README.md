# 🌟 별별집수리 (StarStarSuri) — 업체 소개 및 문의 웹 서비스

## 📌 요약
소상공인 홈페이지의 게시판/문의 기능을 제공하는 웹 서비스를 구현했습니다.  

- **React(Vite) 기반의 반응형 UI** 
- **Nginx 리버스 프록시:** 정적 파일 서빙과 /api 프록시를 구성
- **CRUD :** 게시글/문의글 등록·조회·수정·삭제와 목록 페이징을 구현  
- **React Router, Axios:** 클라이언트 라우팅과 API 통신을 구성  
- **Nginx:** 정적 리소스 서빙과 백엔드 프록시를 분리
- **프론트 우회 코드 제거** 
- **운영 중 CORS 관련 4xx/5xx 무관측(5주+)**
- **RTO ≤ 30분 유지**


## 🤔 문제 / 해결 
집수리업을 하시는 소상공인분께 도움을 드리자는 취지로 시작한 프로젝트입니다.  
업체에 대한 정보전달, 고객들이 간편하게 문의를 남길 수 있도록 설계해야겠습니다. 

- **사용자 친화적인 UI/UX**
- **3계층(Controller–Service–Repository) :** 기반의 게시판 CRUD 설계
- **Nginx 리버스 프록시:** 프론트/백엔드 분리 운영
- **환경 분리와 시크릿 관리 습관화:** 배포 자동화에 대비
- **Azure 스냅샷+스케줄:** 복구 체계 구축

## 🔨 기술
- **Frontend**: React (Vite), React Router, Axios, CSS Modules(또는 styled-components)  
- **Backend**: Java 17+, Spring Boot 3, Spring Data JPA, Spring Security, Gradle  
- **DB/Infra**: MySQL, Azure VM, Nginx(Reverse Proxy)

## 👪 팀원
- **양다연 (Fullstack)**: 게시판/문의 도메인 및 CRUD, 페이징/검색, 프론트엔드 UI,\
 배포·리버스 프록시 구성을 구현했습니다.

## 📎 링크
https://starstatsuri.site/

## ⚙️ Setup 
```bash
# [Backend]
# 1) Clone
git clone https://github.com/soonybutter/starstarsuri_BE.git
cd starstarsuri_BE

# 2) 실행
# 개발
./gradlew bootRun --args="--spring.profiles.active=local"

# 배포
./gradlew bootJar
java -jar build/libs/*.jar --spring.profiles.active=prod

# [Frontend]
# 1) Clone
git clone https://github.com/soonybutter/starstarsuri_FE.git
cd starstarsuri_FE

# 2) 패키지 설치
npm install

# 3) 환경 변수 설정 (.env)
# VITE_API_BASE=http://localhost:8080    # 운영 시 서비스 도메인으로 교체

# 4) 개발 서버 실행
npm run dev
