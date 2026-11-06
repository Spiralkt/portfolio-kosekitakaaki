# Kakomon Hub｜大学向け過去問共有アプリ

大学の授業ごとに過去問PDFを共有・閲覧できるWebアプリです。授業名や担当教員と資料を紐づけ、学生が必要な学習資料を見つけやすくすることを目指しています。

## 主な機能

- メールアドレス・パスワードによるユーザー登録とログイン
- 授業・担当教員と関連づけた過去問PDFの投稿
- 投稿一覧とブラウザー内PDF閲覧
- ログインユーザー向けの個人ノート

## 技術スタック

**Next.js 15 / React 19 / TypeScript / Tailwind CSS / PostgreSQL / Prisma / Supabase**

Next.js Server ActionsからPrismaを通じてデータベースを操作し、認証にはSupabase Auth、PDF保存にはSupabase Storageを利用しています。

## プロジェクト詳細

機能の詳細、アーキテクチャ、セットアップ手順、現在の制約については[プロジェクトREADME](./kakomonhub-colab/README.md)をご覧ください。