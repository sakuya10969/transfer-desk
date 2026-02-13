"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { PlayersListQuery } from "@/features/players/graphql/PlayersListQuery";
import { DeletePlayerMutation } from "@/features/players/graphql/DeletePlayerMutation";
import type { PlayersListQuery as PlayersListQueryType } from "@/__generated__/PlayersListQuery.graphql";
import type { DeletePlayerMutation as DeletePlayerMutationType } from "@/__generated__/DeletePlayerMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { POSITIONS } from "@/constants/positions";

const PAGE_SIZE = 20;

export function PlayerList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("");

  const conditions: any[] = [];
  if (search) conditions.push({ name: { _ilike: `%${search}%` } });
  if (positionFilter) conditions.push({ position: { _eq: positionFilter } });
  const where = conditions.length > 0 ? { _and: conditions } : {};

  const data = useLazyLoadQuery<PlayersListQueryType>(PlayersListQuery, {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where,
    order_by: [{ name: "asc" as any }],
  }, { fetchPolicy: "network-only" });

  const [commitDelete] = useMutation<DeletePlayerMutationType>(DeletePlayerMutation);

  const totalCount = data.players_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleSearch = useCallback(() => {
    setSearch(searchInput);
    setPage(0);
  }, [searchInput]);

  const handleDelete = useCallback(
    (id: string, name: string) => {
      if (!confirm(`「${name}」を削除しますか？`)) return;
      commitDelete({
        variables: { id },
        onCompleted: () => window.location.reload(),
      });
    },
    [commitDelete],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="選手名で検索"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="max-w-xs"
        />
        <Select
          value={positionFilter}
          onValueChange={(v) => {
            setPositionFilter(v === "all" ? "" : v);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="ポジション" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全て</SelectItem>
            {POSITIONS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleSearch}>
          検索
        </Button>
        {(search || positionFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              setSearchInput("");
              setPositionFilter("");
              setPage(0);
            }}
          >
            クリア
          </Button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          {totalCount} 件
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>選手一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {data.players.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              登録された選手はありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">選手名</th>
                    <th className="pb-2 font-medium">ポジション</th>
                    <th className="pb-2 font-medium">国籍</th>
                    <th className="pb-2 font-medium">所属クラブ</th>
                    <th className="pb-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.players.map((player) => (
                    <tr key={player.id} className="border-b last:border-0">
                      <td className="py-3">
                        <Link
                          href={`/players/${player.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {player.name}
                        </Link>
                      </td>
                      <td className="py-3">{player.position ?? "-"}</td>
                      <td className="py-3">{player.nationality ?? "-"}</td>
                      <td className="py-3">
                        {player.current_club ? (
                          <Link
                            href={`/clubs/${player.current_club.id}`}
                            className="text-primary hover:underline"
                          >
                            {player.current_club.name}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/players/${player.id}/edit`}>編集</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(player.id, player.name)}
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
