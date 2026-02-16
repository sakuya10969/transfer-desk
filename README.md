# TransferDesk

サッカークラブ・選手・契約・移籍・成績を一元管理する Web アプリケーションです。  
フロントエンドは Next.js + React、データアクセスは Relay 経由で GraphQL (Hasura) に接続します。

## 機能概要

- ダッシュボード表示
  - 登録クラブ数 / 選手数 / 契約数 / 移籍件数の集計
  - 最近更新クラブ、最近追加選手、直近移籍履歴の表示
- クラブ管理
  - 一覧・検索・詳細・登録・編集・削除
- 選手管理
  - 一覧（名前検索 / ポジション絞り込み）・詳細・登録・編集・削除
- 契約管理
  - 一覧・詳細・登録・編集・削除
- 移籍管理
  - 一覧（年フィルタ）・詳細・登録・編集・削除
- 成績管理
  - 一覧（シーズンフィルタ）・登録・編集・削除
- 設定
  - ライト / ダークテーマ切替
  - クラブ CSV インポート（`name` 必須）

## 技術スタック

- フロントエンド
  - Next.js 16 (App Router)
  - React 19 / TypeScript 5
  - Tailwind CSS v4
  - shadcn/ui + Radix UI + lucide-react
- データアクセス
  - GraphQL + Relay Runtime / react-relay
  - Relay Compiler（`__generated__` に成果物を生成）
- バックエンド / DB
  - Hasura GraphQL Engine
  - PostgreSQL 16
  - Prisma（スキーマ・マイグレーション管理）
- 開発ツール
  - ESLint / Prettier
  - pnpm
  - Docker Compose（Postgres / Hasura 起動）

## アーキテクチャ

```text
Browser (Next.js Client Components)
  -> Relay Environment (react-relay)
  -> /api/graphql (Next.js Route Handler)
  -> Hasura GraphQL Engine
  -> PostgreSQL
```

- クライアントは Relay で GraphQL Query / Mutation を実行
- `app/api/graphql/route.ts` が BFF 的に Hasura へプロキシ
- サーバー側の補助 API（例: `app/api/import/clubs/route.ts`）は Hasura に直接 Mutation を送信
- Prisma は DB スキーマ定義とマイグレーション管理に利用

## データモデル

主要エンティティ:

- `clubs`
- `players`
- `contracts`
- `transfers`
- `stats`

主な関係:

- `players.current_club_id -> clubs.id`
- `contracts.player_id -> players.id`, `contracts.club_id -> clubs.id`
- `transfers.player_id -> players.id`, `transfers.from_club_id -> clubs.id`, `transfers.to_club_id -> clubs.id`
- `stats` は `(season, player_id, club_id)` の複合ユニーク制約

詳細は `prisma/schema.prisma` を参照してください。

## ディレクトリ構成

```text
.
├── app/                      # Next.js App Router ページ / API
│   ├── api/
│   │   ├── graphql/route.ts  # Hasura への GraphQL プロキシ
│   │   └── import/clubs/route.ts
│   ├── clubs/ players/ contracts/ transfers/ stats/ settings/
│   └── layout.tsx
├── features/                 # ドメイン単位の UI + GraphQL 定義
│   ├── clubs/
│   ├── players/
│   ├── contracts/
│   ├── transfers/
│   ├── stats/
│   ├── dashboard/
│   └── settings/
├── components/               # 共通 UI / レイアウト
├── relay/                    # Relay Environment
├── __generated__/            # Relay コンパイル生成物
├── prisma/                   # Prisma schema / migrations
├── schema.graphql            # Relay 用 GraphQL スキーマ
└── docker-compose.yml        # Postgres / Hasura
```

## 画面ルーティング

- `/` ダッシュボード
- `/clubs`, `/clubs/new`, `/clubs/[id]`, `/clubs/[id]/edit`
- `/players`, `/players/new`, `/players/[id]`, `/players/[id]/edit`
- `/contracts`, `/contracts/new`, `/contracts/[id]`, `/contracts/[id]/edit`
- `/transfers`, `/transfers/new`, `/transfers/[id]`, `/transfers/[id]/edit`
- `/stats`, `/stats/new`, `/stats/[id]/edit`
- `/settings`

## セットアップ

### 1. 依存関係をインストール

```bash
pnpm install
```

### 2. DB と Hasura を起動

```bash
docker compose up -d
```

Hasura コンソール: `http://localhost:8080`

### 3. 環境変数を設定

`.env` に以下を設定:

```bash
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=adminsecretkey
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/transferdesk
```

### 4. （必要に応じて）マイグレーションを適用

```bash
npx prisma migrate deploy
```

### 5. GraphQL スキーマ・Relay 生成物を更新

```bash
pnpm codegen
```

### 6. 開発サーバー起動

```bash
pnpm dev
```

`http://localhost:3000` を開いて確認します。

## 開発コマンド

- `pnpm dev` 開発サーバー起動
- `pnpm build` 本番ビルド
- `pnpm start` 本番サーバー起動
- `pnpm lint` ESLint 実行
- `pnpm format` TS/TSX 整形
- `pnpm schema:fetch` Hasura から `schema.graphql` 取得
- `pnpm relay` Relay コンパイル
- `pnpm codegen` `schema:fetch` + `relay`
- `pnpm relay:watch` Relay watch

## CSV インポート仕様（クラブ）

- エンドポイント: `POST /api/import/clubs`
- フォームデータ: `file`
- 対応ヘッダー:
  - 必須: `name`（または `クラブ名` / `club`）
  - 任意: `country`, `league`, `founded_year`, `stadium`

## 補足

- 本プロジェクトは `next.config.ts` で Relay コンパイラ設定を有効化しています。
- クライアントからは Hasura に直接接続せず、`/api/graphql` を経由します。
- Prisma Client はアプリ本体では直接利用しておらず、スキーマ管理中心の構成です。
