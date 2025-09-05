# 🌟 별별집수리 (StarStarSuri) 


## 📌 Summary
소상공인 홈페이지의 게시판/문의 기능을 제공하는 풀스택 웹 서비스를 구현했습니다.  

- **Frontend** : React(Vite) 기반의 반응형 UI로 구성했습니다.
- **Backend** : Spring Boot 3 + JPA로 RESTful API와 MySQL 연동을 구현했습니다.  
- Azure VM에 배포하고 Nginx 리버스 프록시로 정적 파일 서빙과 /api 프록시를 구성했습니다.  

- 게시글/문의글 등록·조회·수정·삭제와 목록 페이징을 구현했습니다.  
- React Router, Axios를 적용해 클라이언트 라우팅과 API 통신을 구성했습니다.  
- 배포 환경에서는 Nginx로 정적 리소스 서빙과 백엔드 프록시를 분리 구성했습니다.
- 시크릿 분리와 프로파일('local/prod') 기반 설정으로 운영 안정성을 높였습니다.  


## 🤔 Background
집수리업을 하시는 소상공인분께 도움을 드리자는 취지로 시작한 웹 페이지 제작 프로젝트입니다.
지역 사용자/고객이 간편하게 문의를 남길 수 있고 운영자가 게시글을 관리하기 쉬운 게시판 서비스를 설계했습니다.
단일 서비스로 빠르게 구축·배포 가능한 아키텍처를 목표로 하여 React + Spring Boot 조합을 채택했습니다.

## 🔍 Meaning
- Spring Boot 3/JPA로 엔티티 설계·트랜잭션·예외 처리를 정리했습니다.  
- CORS와 Nginx 리버스 프록시 구조로 프론트/백엔드 분리 운영을 경험했습니다.  
- 목록 페이징/검색, 입력 검증, 에러 응답 포맷 정리 등 실서비스 운영 기본기를 다졌습니다.  
- 환경 분리와 시크릿 관리를 습관화해 배포 자동화에 대비했습니다.

## 🔨 Technology Stack(s)
- **Frontend**: React (Vite), React Router, Axios, CSS Modules(또는 styled-components)  
- **Backend**: Java 17+, Spring Boot 3, Spring Data JPA, Spring Security, Gradle  
- **DB/Infra**: MySQL, Azure VM, Nginx(Reverse Proxy)

## 👪 Members
- **양다연 (Fullstack)**: 게시판/문의 도메인 및 CRUD, 페이징/검색, 프론트엔드 UI, 배포·리버스 프록시 구성을 구현했습니다.

## 📎 링크
https://starstatsuri.site/

## ⚙️ Setup & Usage
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
