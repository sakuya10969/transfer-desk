# CLAUDE.md

このファイルは Claude Code がリポジトリを扱う際のコンテキストを提供します。

## プロジェクト概要

TransferDesk はサッカークラブ・選手・契約・移籍・成績を一元管理する Web アプリケーション。
フロントエンドは Next.js + React、データアクセスは Relay 経由で GraphQL (Hasura) に接続する構成。

## 技術スタック

| レイヤー | 技術 |
|----------|------|
| フレームワーク | Next.js 16 (App Router) |
| UI | React 19 / TypeScript 5 (strict) |
| スタイリング | Tailwind CSS v4 / shadcn/ui (new-york) / Radix UI / lucide-react |
| データアクセス | GraphQL + Relay Runtime 20 / react-relay 20 |
| フォーム | react-hook-form 7 + zod 4 |
| バックエンド | Hasura GraphQL Engine v2.40.0 |
| DB | PostgreSQL 16 |
| スキーマ管理 | Prisma 7 (マイグレーション専用、アプリ内で Prisma Client は未使用) |
| パッケージマネージャ | pnpm |
| リンター / フォーマッタ | ESLint 9 (flat config) / Prettier |
| コンテナ | Docker Compose (Postgres + Hasura) |

## アーキテクチャ

```
Browser (Next.js Client Components)
  → Relay Environment (react-relay)
  → /api/graphql (Next.js Route Handler — BFF)
  → Hasura GraphQL Engine
  → PostgreSQL
```

- クライアントは Hasura へ直接接続しない。`/api/graphql` を BFF として経由する。
- サーバー側 API（CSV インポート等）は `app/api/_lib/hasuraClient.ts` を介して Hasura に直接 Mutation を送信。
- Relay Compiler が `schema.graphql` からTypeScript 型を `__generated__/` に生成する。

## ディレクトリ構成

```
.
├── app/                          # Next.js App Router ページ / API ルート
│   ├── api/
│   │   ├── _lib/hasuraClient.ts  # Hasura クライアントユーティリティ
│   │   ├── graphql/route.ts      # GraphQL プロキシ (BFF)
│   │   └── import/clubs/route.ts # CSV インポート API
│   ├── clubs/ players/ contracts/ transfers/ stats/ settings/
│   ├── layout.tsx                # ルートレイアウト (Relay Provider)
│   ├── page.tsx                  # ダッシュボード
│   └── globals.css               # グローバルスタイル / Tailwind 設定
├── features/                     # ドメイン単位のモジュール
│   ├── {domain}/
│   │   ├── components/           # ドメイン固有コンポーネント
│   │   ├── graphql/              # Relay Query / Mutation 定義
│   │   └── hooks/                # ドメイン固有フック (一部)
├── components/                   # 共有 UI
│   ├── layout/sidebar.tsx        # サイドバー
│   └── ui/                       # shadcn/ui コンポーネント群
├── relay/                        # Relay Environment / Provider
├── lib/utils.ts                  # ユーティリティ (cn ヘルパー等)
├── constants/index.ts            # LEAGUES, POSITIONS 定数
├── __generated__/                # Relay コンパイル生成物 (gitignored)
├── prisma/
│   ├── schema.prisma             # DB スキーマ定義
│   └── migrations/               # マイグレーションファイル
├── schema.graphql                # Relay 用 GraphQL スキーマ (Hasura から取得)
└── docker-compose.yml            # Postgres / Hasura
```

## データモデル

### エンティティと主要フィールド

- **Club**: `id` (UUID), `name`, `country`, `league`, `foundedYear`, `stadium`
- **Player**: `id` (UUID), `name`, `position` (enum), `nationality`, `birthDate`, `currentClubId`
- **Contract**: `id` (UUID), `playerId`, `clubId`, `startDate`, `endDate`, `salary`, `clause`
- **Transfer**: `id` (UUID), `playerId`, `fromClubId`, `toClubId`, `transferYear`, `transferMonth`, `type` (enum), `fee`, `loanEndYear`, `loanEndMonth`
- **Stat**: `id` (UUID), `season`, `playerId`, `clubId`, `matches`, `goals`, `assists` — `(season, playerId, clubId)` の複合ユニーク制約

### Enum

- **Position**: GK, CB, LB, RB, DM, CM, AM, LM, RM, LWG, RWG, CF, ST
- **TransferType**: PERMANENT, LOAN, FREE, RETURN_FROM_LOAN, END_OF_CONTRACT

### リレーション

- `players.currentClubId → clubs.id`
- `contracts.playerId → players.id`, `contracts.clubId → clubs.id`
- `transfers.playerId → players.id`, `transfers.fromClubId → clubs.id`, `transfers.toClubId → clubs.id`
- `stats.(playerId, clubId) → players.id, clubs.id`

## 開発コマンド

```bash
pnpm dev              # 開発サーバー起動
pnpm build            # 本番ビルド
pnpm start            # 本番サーバー起動
pnpm lint             # ESLint 実行
pnpm format           # Prettier で TS/TSX 整形
pnpm schema:fetch     # Hasura から schema.graphql を取得
pnpm relay            # Relay コンパイル実行
pnpm codegen          # schema:fetch + relay (フルコード生成)
pnpm relay:watch      # Relay コンパイル (watch モード)
```

## ファイル命名規則

| 種別 | 命名規則 | 例 |
|------|----------|-----|
| ページ | `page.tsx` (App Router 規約) | `app/clubs/page.tsx` |
| コンポーネント | PascalCase | `ClubDetail.tsx`, `PlayerForm.tsx` |
| GraphQL 定義 | PascalCase + Query/Mutation | `ClubsListQuery.ts`, `CreatePlayerMutation.ts` |
| ユーティリティ | camelCase | `utils.ts`, `hasuraClient.ts` |
| 定数 | UPPER_SNAKE_CASE (エクスポート) | `LEAGUES`, `POSITIONS` |
| API ルート | `route.ts` (App Router 規約) | `app/api/graphql/route.ts` |

## 設定ポイント

- **TypeScript**: strict モード有効、パスエイリアス `@/*` → `./*`
- **Relay Compiler**: `relay.config.js` で設定。`schema.graphql` を読み取り、`__generated__/` に TypeScript を出力
- **Next.js**: `next.config.ts` で Relay コンパイラ統合を有効化
- **ESLint**: flat config 形式 (`eslint.config.mjs`)。`next/core-web-vitals` + TypeScript
- **shadcn/ui**: `components.json` で設定。スタイル: new-york、カラー: neutral、CSS 変数でテーマ管理
- **PostCSS**: `@tailwindcss/postcss` プラグイン

## 環境変数

```
HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=adminsecretkey
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/transferdesk
```

## インフラ (Docker Compose)

- **PostgreSQL 16**: ポート 5432、DB名 `transferdesk`
- **Hasura v2.40.0**: ポート 8080、コンソール有効、dev モード

## コード変更時の注意事項

1. GraphQL スキーマを変更した場合は `pnpm codegen` を実行して Relay 生成物を再生成する
2. DB スキーマを変更する場合は `prisma/schema.prisma` を編集し `npx prisma migrate dev` でマイグレーション作成
3. 新しい UI コンポーネントは `components/ui/` (汎用) または `features/{domain}/components/` (ドメイン固有) に配置
4. `__generated__/` ディレクトリは手動編集しない (Relay Compiler が自動生成)
5. Prisma Client はアプリ本体では使用しない — データアクセスは全て Relay + GraphQL 経由
