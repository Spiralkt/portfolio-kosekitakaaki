# Dockerイメージを指定
FROM node:24-slim

RUN apt-get update -y && apt-get install -y openssl

# appというディレクトリを作成しソースコードを配置、npm ci(clean install)でライブラリをインストールし、npm run buildでライブラリをビルド
RUN mkdir /app
WORKDIR /app
ADD . /app/
RUN npm ci
RUN npm run build

# 別ホストからもアクセスできるように設定
ENV HOST 0.0.0.0

# Next.jsを起動
ENTRYPOINT npm run start
