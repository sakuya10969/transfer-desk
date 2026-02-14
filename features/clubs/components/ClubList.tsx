"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { ClubsListQuery } from "@/features/clubs/graphql/ClubsListQuery";
import { DeleteClubMutation } from "@/features/clubs/graphql/DeleteClubMutation";
import type { ClubsListQuery as ClubsListQueryType } from "@/__generated__/ClubsListQuery.graphql";
import type { DeleteClubMutation as DeleteClubMutationType } from "@/__generated__/DeleteClubMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/components/ui";

const PAGE_SIZE = 20;

export function ClubList() {
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const where = search
    ? { name: { _ilike: `%${search}%` } }
    : undefined;

  const queryVars = {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where: where ?? {},
    order_by: [{ name: "asc" }],
  } as const;

  const data = useLazyLoadQuery<ClubsListQueryType>(ClubsListQuery, queryVars, { fetchPolicy: "store-and-network" });

  const [commitDelete] = useMutation<DeleteClubMutationType>(DeleteClubMutation);
  const [, setRefetchKey] = useState<number>(0);

  const totalCount = data.clubs_aggregate.aggregate?.count ?? 0;
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
        updater: (store) => {
          store.delete(`clubs:${id}`);
        },
        onCompleted: () => setRefetchKey((k) => k + 1),
      });
    },
    [commitDelete],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="クラブ名で検索"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="max-w-xs"
        />
        <Button variant="outline" onClick={handleSearch}>
          検索
        </Button>
        {search && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch("");
              setSearchInput("");
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
          <CardTitle>クラブ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {data.clubs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              登録されたクラブはありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">クラブ名</th>
                    <th className="pb-2 font-medium">国</th>
                    <th className="pb-2 font-medium">リーグ</th>
                    <th className="pb-2 font-medium">創設年</th>
                    <th className="pb-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.clubs.map((club) => (
                    <tr key={club.id} className="border-b last:border-0">
                      <td className="py-3">
                        <Link
                          href={`/clubs/${club.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {club.name}
                        </Link>
                      </td>
                      <td className="py-3">{club.country ?? "-"}</td>
                      <td className="py-3">{club.league ?? "-"}</td>
                      <td className="py-3">{club.founded_year ?? "-"}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/clubs/${club.id}/edit`}>編集</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(club.id, club.name)}
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
