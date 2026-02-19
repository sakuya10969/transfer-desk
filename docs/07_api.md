# API設計

## GraphQLプロキシ構造

クライアントからのリクエストは、Next.js の Route Handler を経由して Hasura へ転送されます。

```text
Request Flow:
Client (Relay)
  -> POST /api/graphql (Next.js)
    -> Headers: { "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET }
    -> POST Hasura Endpoint
      -> PostgreSQL
```

## BFFの責務

`/api/graphql` (BFF) は以下の責務を持ちます。

1. **認証情報の付与**: クライアントには `HASURA_GRAPHQL_ADMIN_SECRET` を公開せず、サーバーサイドで付与してリクエストを中継する。
2. **エンドポイントの隠蔽**: 実際の Hasura の URL を隠蔽し、将来的なバックエンド構成の変更（例: Hasura から別の GraphQL サーバーへの移行）に強くする。
3. **エラーハンドリング**: Hasura への接続エラーなどをキャッチし、クライアントへ適切な HTTP ステータスコードを返す。

## Mutation設計方針

- **Relay Mutation**: クライアントサイドでの作成・更新・削除操作は、Relay の `useMutation` フックを使用し、GraphQL Mutation を実行する。
- **Updater Config**: Mutation 実行後、ローカルのキャッシュストアを整合させるために、必要に応じて `updater` 関数または Declarative Mutation Config（`connections` 等）を利用してリストの追加・削除を即座に UI に反映させる。

## エラーハンドリング方針

1. **GraphQL エラー (200 OK)**:
   - バリデーションエラーやロジックエラー。
   - レスポンスの `errors` フィールドに含まれる。
   - クライアント側でメッセージを表示する（トースト等）。
2. **ネットワーク/サーバーエラー (4xx, 5xx)**:
   - Hasura ダウンや BFF の不具合。
   - Relay の Error Boundary や `useMutation` の `onError` でキャッチし、致命的なエラーとして扱う。
