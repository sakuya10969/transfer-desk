# データベース設計

## テーブル構成概要

PostgreSQL 上に以下のテーブルが展開されます。詳細は `prisma/schema.prisma` に定義されます。

- `clubs`
- `players`
- `contracts`
- `transfers`
- `stats`

各テーブルは UUID または Serial/BigInt を主キーとし、作成日時 (`created_at`) と更新日時 (`updated_at`) を持ちます。

## インデックス戦略

検索頻度の高いカラムにはインデックスを付与します。

- **Clubs**: `name` (検索用)
- **Players**: `last_name`, `first_name` (名前検索用), `current_club_id` (FK検索用)
- **Transfers**: `player_id`, `from_club_id`, `to_club_id`, `transfer_date` (履歴参照用)
- **Stats**: `player_id`, `club_id`, `season`

## ユニーク制約

データの整合性を保つため、DB レベルで以下の制約を設けます。

- `stats`: `(season, player_id, club_id)` の複合ユニーク。同一選手が同一シーズン・同一クラブで複数の成績レコードを持つことを防ぐ。

## 複合キー

本プロジェクトでは主キー（Primary Key）には単一の ID（Int または UUID）を使用することを推奨し、複合主キーは避けます。複合的な一意性はユニーク制約で担保します。

## マイグレーション方針

- **ツール**: Prisma Migrate を使用。
- **プロセス**:
  1. `prisma/schema.prisma` を編集。
  2. `npx prisma migrate dev --name <description>` で SQL ファイル生成と適用。
  3. Git にコミット。
  4. CI/CD または本番環境で `npx prisma migrate deploy` を実行し適用。

## Prismaの役割

- **スキーマ管理**: Source of Truth としての DB 定義。
- **マイグレーション実行**: DB 構造の変更管理。
- **※注意**: アプリケーションの実行時（Runtime）のデータフェッチには Prisma Client は使用せず、Hasura を経由します。Prisma はあくまで「管理ツール」としての位置付けです。
