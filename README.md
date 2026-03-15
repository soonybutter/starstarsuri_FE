# 별별집수리

소상공인을 위한 무료 홍보 홈페이지로, 가게 소개와 고객 문의를 온라인에서 효율적으로 관리할 수 있도록 구현한 웹 서비스입니다.

## 배포 및 저장소 링크
- 서비스 주소: https://starstatsuri.site/
- Backend Repository: https://github.com/soonybutter/starstarsuri_BE.git
- Frontend Repository: https://github.com/soonybutter/starstarsuri_FE.git

## 프로젝트 개요
- 개발 기간: 2024.04 ~ 2024.07
- 참여 인원: 1명
- 담당 역할: 기획, 프론트엔드, 백엔드, 배포 전반 직접 수행

## 기술 스택

### Frontend
- React
- JavaScript
- HTML/CSS

### Backend
- Java
- Spring Boot
- Spring Security OAuth2

### Database
- MySQL

### Infra
- AWS EC2 (Ubuntu)
- Nginx (Reverse Proxy)

### Tools
- Spring Tool Suite (STS)
- Visual Studio Code
- Git
- GitHub

### External API
- Kakao Login API

## 시스템 아키텍처
![아키텍처](/assets/images/arch.png)

- React 프론트엔드와 Spring Boot 백엔드를 분리하여 구성했습니다.
- Nginx Reverse Proxy를 통해 클라이언트 요청을 백엔드 서버로 전달하도록 구성했습니다.
- 고객 문의 데이터는 MySQL에 저장되며, 관리자 계정은 카카오 로그인 기반으로 인증되도록 구현했습니다.

## 주요 기능
- 업체 소개 및 서비스 정보 제공
- 고객 문의 등록 및 조회
- 관리자 계정 기반 문의 답변 기능
- 카카오 로그인 기반 인증
- 배포 환경 구성 및 운영

## 페이지별 화면 설명

### 1) 메인 페이지
![메인 페이지](/assets/images/main.png)

별도의 회원가입 과정을 줄이고 사용자 접근성을 높이기 위해 카카오 OAuth2 로그인을 도입했습니다.

- 기능:
  - 업체 소개
  - 서비스 안내
  - 연락처 및 홍보 정보 제공
    
- 기술:
  - Spring Security OAuth2 기반 카카오 로그인 구현
  - 카카오 API를 통해 사용자 정보 조회 및 DB 저장


### 2) 문의 게시판
![문의 게시판](/assets/images/mmm.png)
![문의 게시판](/assets/images/moone1.png)

문의 목록을 조회할 수 있으며, 관리자의 답변이 등록된 경우 답변 내용을 함께 확인할 수 있도록 구현했습니다.

- 기능:
  - 문의 등록 기능
  - 문의 목록 조회 기능
    
- 기술:
  - REST API 기반 게시판 기능 구현
    - React 프론트엔드에서 문의 등록, 조회 요청을 보내면 Spring Boot 서버에서 REST API로 처리하도록 구현했습니다.
  - MySQL 기반 데이터 관리
    - 문의 게시글과 답변 데이터를 MySQL 데이터베이스에 저장하고 관리했습니다
- 3계층 아키텍처 적용
  - Controller → Service → Repository 구조로 계층을 분리하여 유지보수성과 확장성을 고려한 설계를 적용했습니다.


### 3) 관리자 답변 기능
![관리자 페이지](/assets/images/sajang.png)

관리자는 등록된 문의에 대해 답변을 작성할 수 있습니다.

- 기능:
  - 문의 상태 관리
  - 답변 작성 기능
    
- 기술:
  - 사용자 기반 데이터 처리
    - 로그인한 사용자의 정보를 기반으로 문의 작성자 데이터를 저장하도록 구현했습니다.
  - Kakao OAuth2 인증 연동
    - Spring Security OAuth2를 활용하여 카카오 로그인 인증을 구현하고 인증된 사용자만 게시판 기능을 사용할 수 있도록 처리했습니다.


## ERD
![ERD](/assets/images/erd.png)

- 문의 게시판 중심의 데이터 흐름을 반영해 사용자 문의와 관리자 답변 관계를 구성했습니다.
- 세부 테이블 구조는 ERD를 통해 확인할 수 있습니다.

## 핵심 구현 포인트

### 카카오 로그인 기반 관리자 인증
- 별도의 회원가입 절차 없이 카카오 로그인으로 인증을 처리해 관리자 접근 편의성을 높였습니다.
- 관리자 권한이 부여된 계정만 문의 답변 기능에 접근할 수 있도록 구성했습니다.

### 문의 게시판 DB 저장 구조
- 단순 정적 소개 페이지가 아니라, 고객 문의가 지속적으로 누적되고 관리될 수 있도록 DB 저장 구조를 적용했습니다.
- 이를 통해 실제 운영 가능한 서비스 형태로 확장했습니다.

### 운영을 고려한 배포 구조
- AWS EC2와 Nginx Reverse Proxy를 활용해 프론트엔드와 백엔드를 분리 배포했습니다.
- 실제 서비스 운영을 고려하여 도메인 기반 접근이 가능하도록 구성했습니다.

## 트러블슈팅

### 1) HikariCP 커넥션 풀 설정 최적화
#### 문제 상황
Spring Boot 애플리케이션에서 DB 연결을 위해 HikariCP 커넥션 풀을 사용하고 있었습니다.  
기본 설정에서는 커넥션이 장시간 유지될 수 있어 불필요한 유휴 커넥션이 유지될 가능성이 있다고 판단했습니다.

#### 원인 분석
HikariCP 기본 설정에서는 커넥션의 유휴 시간과 최대 생존 시간이 비교적 길게 설정되어 있습니다.  
트래픽이 많지 않은 환경에서는 사용되지 않는 유휴 커넥션이 장시간 유지될 수 있어 DB 리소스를 비효율적으로 사용할 가능성이 있었습니다.

#### 해결 방법
DB 커넥션을 효율적으로 관리하기 위해 HikariCP 설정을 검토했습니다.
- `idleTimeout`: 10분
- `maxLifetime`: 30분

유휴 상태의 커넥션이 과도하게 유지되지 않도록 조정하고, 장시간 유지되는 커넥션으로 인한 문제 가능성을 줄이도록 설정했습니다.

#### 결과
유휴 커넥션을 적절히 정리하도록 설정하여 DB 리소스를 보다 안정적으로 관리할 수 있도록 구성했습니다.

### 2) 작업 사례 페이지 이미지 로딩 성능 개선
#### 문제 상황
소상공인의 실제 작업 사례를 보여주는 페이지에서는 약 20장의 이미지가 한 페이지에서 로드되었습니다.  
초기 페이지 진입 시 이미지가 동시에 로딩되면서 페이지의 Largest Contentful Paint(LCP) 시간이 길어지는 문제가 있었습니다.

#### 원인 분석
Chrome Lighthouse를 통해 측정한 결과 LCP 지표가 개선될 여지가 있었습니다.  
또한 이미지 요청 시 브라우저 캐시가 활용되지 않아 재방문 시에도 이미지가 다시 다운로드되는 점을 확인했습니다.

#### 해결 방법
이미지 리소스에 Cache-Control 헤더를 적용해 브라우저 캐시를 활용하도록 구성했습니다.  
이미지 리소스는 변경 가능성이 낮다고 판단해 `max-age`를 1년으로 설정했습니다.

#### 결과
- LCP 약 0.6s 수준의 빠른 렌더링 성능 유지
- 불필요한 네트워크 요청 감소
- 재방문 시 체감 로딩 속도 개선

## 실행 방법

### Backend
```bash
git clone https://github.com/soonybutter/starstarsuri_BE.git
cd starstarsuri_BE

# 개발 실행
./gradlew bootRun --args="--spring.profiles.active=local"

# 배포용 빌드 및 실행
./gradlew bootJar
java -jar build/libs/*.jar --spring.profiles.active=prod
