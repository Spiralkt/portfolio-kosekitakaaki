# Kakomon Hub

大学の過去問PDFを、授業・担当教員の情報とあわせて共有・閲覧するためのWebアプリです。
学生が過去問を探しやすくし、学習に必要な資料へアクセスしやすくすることを目指して開発しています。

## アプリ概要

Kakomon Hubでは、ユーザーが過去問PDFを授業名・教員名と関連づけて投稿できます。投稿された資料は一覧から選び、ブラウザー上で閲覧できます。ログイン機能と個人用ノート機能も備えています。

## 主な機能

- メールアドレスとパスワードによる新規登録・ログイン（Supabase Auth）
- 過去問PDFの投稿と一覧表示
- 授業・担当教員の登録、および投稿への関連づけ
- PDFのブラウザー内表示
- ログインユーザー向けのノート作成・編集・削除
- 投稿一覧や授業・教員情報の取得にReact Queryを利用

PDF投稿では、ファイル形式をPDFに限定し、ファイルサイズを5 MB以下にするクライアント側チェックを行っています。

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| フロントエンド | Next.js 15 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, Radix UI |
| データ取得 | TanStack React Query |
| 認証・ファイルストレージ | Supabase Auth, Supabase Storage |
| データベース・ORM | PostgreSQL, Prisma 6 |
| 開発・配備環境 | Docker, Docker Compose, Nginx Proxy Manager |

## アーキテクチャ概要

- Next.jsの画面からServer Actionsを呼び出し、Prisma経由でPostgreSQLのデータを操作します。
- Supabase Authでユーザー認証を行い、PDFファイルはSupabase Storageに保存します。
- データベースにはユーザー、投稿、授業、教員、いいね、ノートを管理するモデルを定義しています。

## ローカルでの起動

### 必要なもの

- Node.js 24（`frontend/Dockerfile`で使用）
- npm
- PostgreSQLデータベース
- Supabaseプロジェクト（AuthとStorage）

### 1. 環境変数を設定

`frontend/.env`を作成し、接続先に合わせて値を設定してください。`.env`はGit管理対象外です。

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"
```

Supabase Storageに`post-pdfs`バケットを作成してください。アプリは投稿PDFのアップロードにこのバケットを使用します。PDFを公開URLで表示するため、バケットの読み取り設定もアプリの公開方針に合わせて構成してください。Supabase Authではメールアドレス・パスワード認証を有効にしてください。

### 2. 依存関係・データベースを準備

リポジトリのルートで実行します。

```bash
cd frontend
npm ci
npx prisma generate
npx prisma migrate deploy
```

`migrate deploy`は`frontend/prisma/migrations`にあるマイグレーションを適用します。接続先データベースを確認してから実行してください。

### 3. 開発サーバーを起動

```bash
npm run dev
```

ブラウザーで <http://localhost:3000> を開きます。

## ディレクトリ構成

```text
.
├── frontend/
│   ├── prisma/           # PrismaスキーマとDBマイグレーション
│   └── src/
│       ├── actions/      # Server Actions
│       ├── app/          # Next.jsページ・ルート
│       ├── components/   # UIコンポーネント
│       ├── providers/    # 認証・データ取得などのProvider
│       └── utils/        # Supabaseクライアントなど
├── compose.yaml
└── .devcontainer/        # Dev Container設定
```

## 現在の制約・今後の改善

- 投稿一覧は最新10件を表示する仕様で、ページネーションや絞り込み検索は未実装です。
- コメント機能は未実装です。
- Docker Compose構成を利用する場合も、PostgreSQLとSupabaseの接続情報・サービスは別途用意する必要があります。

## 開発コマンド

`frontend/`ディレクトリで実行します。

```bash
npm run dev      # 開発サーバー
npm run lint     # ESLint
npm run build    # 本番ビルド
```
