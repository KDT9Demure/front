# 가구 쇼핑몰, Demure

## 📋 프로젝트 개요
Demure는 이케아(IKEA) 데이터를 활용한 가구 쇼핑몰 입니다. React와 NestJS를 활용해 사이트를 구현했습니다.

<br />

## 🔋 개발 기간
2023.11.16 ~ 2023.12.07

<br />

## ⚡️ 주요 기능
- 장바구니 및 배송지 관리 기능을 제공합니다.
- 쿠폰을 발급하고 사용할 수 있는 기능을 제공합니다.
- 상품 검색과 색상별 검색 기능을 지원합니다.
- 카카오 소셜 로그인을 통해 간편하게 로그인할 수 있습니다.
- NodeMailer를 이용해 이메일 인증 기능을 구현했습니다.
- Redux Toolkit을 활용해 전역 상태를 관리합니다.
- AWS EC2 환경에서 애플리케이션을 배포했습니다.

<br />

## ⚙️ 사용 기술
<div style="display:flex; gap: 5px;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=flat&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonaws&logoColor=white" />
</div>

<br />

- **React** : 부드러운 UI 동작을 위해 사용하였습니다.
- **NestJS** : 모듈화된 아키텍처, 의존성 주입(DI), 데코레이터 기반의 명확한 구조를 제공해 안정적인 서버 설계가 가능해 사용하였습니다.
- **Redux Toolkit** : 전역 상태 관리를 위해 사용하였습니다.
- **TypeScript** : 정적 타입 명시를 통해 코드의 안정성과 유지보수성을 향상시키기 위해 사용하였습니다.
- **PostgreSQL** : 다양한 DB를 경험하기 위한 목적과, ACID 보장·우수한 쿼리 성능 등 안정성과 유연성을 갖춘 점을 고려해 사용하였습니다.

<br />

## 💾 Github
<a href="https://github.com/KDT9Demure/front" target="_blank">프론트엔드(Frontend)</a>
<br />
<a href="https://github.com/KDT9Demure/back" target="_blank">백엔드(Backend)</a>

<br />

## 🌠 Member(팀원)

|                                    이원노(Leader)                                   |                                    박가현                                    |                                     김민영                                     |                                    이우종                                    |                                    황동하                                     |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/105614390?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/138436056?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/138436169?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/107784810?v=4" width=150> | <img src="https://avatars.githubusercontent.com/u/121819598?v=4" width=150> |
|                 [@Leewonno](https://github.com/Leewonno)                 |                    [@bliss1454](https://github.com/bliss1454)                    |                 [@k-minyoung](https://github.com/k-minyoung)                 |             [@RainBell98](https://github.com/RainBell98)             |                    [@hdh9078](https://github.com/hdh9078)                     |


<br />

## 🗺 서비스 화면

### 메인 (Main)
![image](https://github.com/KDT9Demure/.github/assets/105614390/08b60914-07c6-48b0-b2d1-2d4e09149b5a)
![image](https://github.com/KDT9Demure/.github/assets/105614390/d1e56a20-1d8d-41a4-aec1-23a0f2e9aba9)
![image](https://github.com/KDT9Demure/.github/assets/105614390/7efc8f35-ea89-4995-a7e2-c34585555317)
가구 이미지를 볼 수 있는 슬라이드 보드, 'Demure' 사이트 소개, 마우스 이벤트에 따라 랜덤 생성되는 이미지를 볼 수 있습니다.

<br />

### 로그인 (Login)
![image](https://github.com/KDT9Demure/.github/assets/105614390/13296ae2-c762-44c2-ac1e-e1bb0fbe8787)
로그인 기능 / 카카오 로그인 API를 이용할 수 있습니다.

<br />

### 회원가입 (Signup)
![image](https://github.com/KDT9Demure/.github/assets/105614390/7e122d0c-3de3-45f6-bcb7-21d249bde395)
NodeMailer를 이용한 이메일 인증을 이용할 수 있습니다.

<br />

### 제품 목록 (List)
![image](https://github.com/KDT9Demure/.github/assets/105614390/8d8b5530-8009-4cf2-bfd9-8dd3e18dc341)
인기순, 낮은 가격순, 높은 가격순으로 카테고리에 따른 제품 목록을 볼 수 있습니다.

<br />

### 검색 (Search)
![image](https://github.com/KDT9Demure/.github/assets/105614390/7b5da5c1-28a6-41ed-a366-5a1b5016586c)
검색 결과를 인기순, 낮은 가격순, 높은 가격순으로 볼 수 있고, 원하는 색상을 선택해 찾을 수 있습니다.

<br />

### 상품 (Product)
![image](https://github.com/KDT9Demure/.github/assets/105614390/4edc43ed-9c46-40e4-b196-8daf22da6300)
![image](https://github.com/KDT9Demure/.github/assets/105614390/31694691-2026-4d93-b986-65320e7e7f08)
제품에 대한 정보를 보고, 장바구니에 담을 수 있습니다.<br />
또한, 제품에 대한 리뷰를 남길 수 있습니다.

<br />

### 장바구니 (Cart)
![image](https://github.com/KDT9Demure/.github/assets/105614390/6a5b813b-d50a-40c2-9706-50ea4d19aee0)
장바구니에 담은 목록을 확인합니다. 원하는 제품을 선택해 결제 페이지로 이동합니다.

<br />

### 결제 (Pay)
![image](https://github.com/KDT9Demure/.github/assets/105614390/9f114266-615c-4889-925d-f53a2cc7a13a)
![image](https://github.com/KDT9Demure/.github/assets/105614390/0c00462d-de81-432f-8e4b-8ecfb91204f7)
다음 지도 API를 이용해 배송지를 쉽게 입력할 수 있습니다.<br />
쿠폰을 적용해 할인된 가격으로 구매할 수 있습니다.

<br />

### 주문내역확인 (Check)
![image](https://github.com/KDT9Demure/.github/assets/105614390/de0c6295-348c-43c9-9788-f3c1d93972af)
결제한 내역을 확인할 수 있습니다.

<br />

### 챗봇 (ChatBot)
![image](https://github.com/KDT9Demure/.github/assets/105614390/8be1be85-cbec-402b-9a09-97a8ed7b8ad0)
사이트를 이용하며 궁금한 점을 물어볼 수 있습니다.

<br />

### 마이페이지 (My)
![image](https://github.com/KDT9Demure/.github/assets/105614390/82ce9e3f-c8d4-401b-b630-902a6bafffc3)
보유쿠폰, 배송지, 포인트 등 개인정보를 확인하고 수정할 수 있습니다.

<br />

### 이벤트 (Event)
![image](https://github.com/KDT9Demure/.github/assets/105614390/564fb5c0-5d87-4409-9e5b-a7494838bac7)
![image](https://github.com/KDT9Demure/.github/assets/105614390/af36f248-1275-4404-b33f-b391b66b2f8b)
쿠폰을 발급받고, 행사 상품을 확인할 수 있습니다.

<br />

### QnA / 공지사항 (Notice)
![image](https://github.com/KDT9Demure/.github/assets/105614390/3f406320-f203-41e7-8b34-053ee81a9361)
![image](https://github.com/KDT9Demure/.github/assets/105614390/601f6fd7-40fa-4767-addb-aac1d498db3a)
챗봇으로 해결되지 않는 궁금증을 물어볼 수 있습니다.<br />
공지사항을 확인합니다.

<br />