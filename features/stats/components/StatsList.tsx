"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { StatsListQuery } from "@/features/stats/graphql/StatsListQuery";
import { DeleteStatMutation } from "@/features/stats/graphql/DeleteStatMutation";
import type { StatsListQuery as StatsListQueryType } from "@/__generated__/StatsListQuery.graphql";
import type { DeleteStatMutation as DeleteStatMutationType } from "@/__generated__/DeleteStatMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/components/ui";

const PAGE_SIZE = 20;

export function StatsList() {
  const [page, setPage] = useState<number>(0);
  const [seasonFilter, setSeasonFilter] = useState<string>("");

  const where = seasonFilter
    ? { season: { _eq: seasonFilter } }
    : {};

  const data = useLazyLoadQuery<StatsListQueryType>(StatsListQuery, {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where,
    order_by: [{ season: "desc" as any }, { goals: "desc" as any }],
  }, { fetchPolicy: "network-only" });

  const [commitDelete] = useMutation<DeleteStatMutationType>(DeleteStatMutation);

  const totalCount = data.stats_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("この成績データを削除しますか？")) return;
      commitDelete({
        variables: { id },
        onCompleted: () => window.location.reload(),
      });
    },
    [commitDelete],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="シーズン（例: 2024-25）"
          value={seasonFilter}
          onChange={(e) => {
            setSeasonFilter(e.target.value);
            setPage(0);
          }}
          className="max-w-48"
        />
        {seasonFilter && (
          <Button variant="ghost" onClick={() => setSeasonFilter("")}>
            クリア
          </Button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          {totalCount} 件
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>成績一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {data.stats.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              登録された成績はありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">シーズン</th>
                    <th className="pb-2 font-medium">選手</th>
                    <th className="pb-2 font-medium">クラブ</th>
                    <th className="pb-2 font-medium">試合</th>
                    <th className="pb-2 font-medium">得点</th>
                    <th className="pb-2 font-medium">アシスト</th>
                    <th className="pb-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.stats.map((s) => (
                    <tr key={s.id} className="border-b last:border-0">
                      <td className="py-3">{s.season}</td>
                      <td className="py-3">
                        <Link
                          href={`/players/${s.player.id}`}
                          className="text-primary hover:underline"
                        >
                          {s.player.name}
                        </Link>
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/clubs/${s.club.id}`}
                          className="text-primary hover:underline"
                        >
                          {s.club.name}
                        </Link>
                      </td>
                      <td className="py-3">{s.matches}</td>
                      <td className="py-3">{s.goals}</td>
                      <td className="py-3">{s.assists}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link href={`/stats/${s.id}/edit`}>編集</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(s.id)}
                        >
                          削除
                        </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                前へ
              </Button>
              <span className="text-sm text-muted-foreground">
                {page + 1} / {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                次へ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
