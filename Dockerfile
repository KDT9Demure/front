
FROM node:18-alpine
# 명령어를 실행할 work directory 생성
#FROM nginx:latest

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

ADD . /app/

RUN npm install
# work dir 에 dist 폴더 생성 /app/dist

#RUN rm /etc/nginx/conf.d/default.conf
#
#
#COPY ./nginx.conf /etc/nginx/conf.d


# PORT(3000) 개방
EXPOSE 3000

# 서버 실행
ENTRYPOINT npm run dev