FROM node:18-alpine

# 명령어를 실행할 work directory 생성
RUN mkdir -p /app
WORKDIR /app

# 프로젝트 전체를 work directory에 추가
ADD . /app/

# nginx 의 default.conf 를 삭제

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 프로젝트에 사용되는 의존성 설치
RUN npm install

# NEST.JS 빌드
RUN npm run dev

# PORT(3000) 개방
EXPOSE 3000

# 서버 실행
ENTRYPOINT npm run dev