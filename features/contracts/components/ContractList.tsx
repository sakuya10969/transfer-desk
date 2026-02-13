"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { ContractsListQuery } from "@/features/contracts/graphql/ContractsListQuery";
import { DeleteContractMutation } from "@/features/contracts/graphql/DeleteContractMutation";
import type { ContractsListQuery as ContractsListQueryType } from "@/__generated__/ContractsListQuery.graphql";
import type { DeleteContractMutation as DeleteContractMutationType } from "@/__generated__/DeleteContractMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";

const PAGE_SIZE = 20;

export function ContractList() {
  const [page, setPage] = useState<number>(0);

  const data = useLazyLoadQuery<ContractsListQueryType>(ContractsListQuery, {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where: {},
    order_by: [{ start_date: "desc" as any }],
  }, { fetchPolicy: "network-only" });

  const [commitDelete] = useMutation<DeleteContractMutationType>(DeleteContractMutation);

  const totalCount = data.contracts_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("この契約を削除しますか？")) return;
      commitDelete({
        variables: { id },
        onCompleted: () => window.location.reload(),
      });
    },
    [commitDelete],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <span className="text-sm text-muted-foreground">{totalCount} 件</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {data.contracts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              登録された契約はありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">選手</th>
                    <th className="pb-2 font-medium">クラブ</th>
                    <th className="pb-2 font-medium">開始日</th>
                    <th className="pb-2 font-medium">終了日</th>
                    <th className="pb-2 font-medium">年俸</th>
                    <th className="pb-2 font-medium">違約金</th>
                    <th className="pb-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contracts.map((c) => (
                    <tr key={c.id} className="border-b last:border-0">
                      <td className="py-3">
                        <Link
                          href={`/players/${c.player.id}`}
                          className="text-primary hover:underline"
                        >
                          {c.player.name}
                        </Link>
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/clubs/${c.club.id}`}
                          className="text-primary hover:underline"
                        >
                          {c.club.name}
                        </Link>
                      </td>
                      <td className="py-3">{c.start_date?.slice(0, 10) ?? "-"}</td>
                      <td className="py-3">{c.end_date?.slice(0, 10) ?? "-"}</td>
                      <td className="py-3">
                        {c.salary != null ? c.salary.toLocaleString() : "-"}
                      </td>
                      <td className="py-3">
                        {c.clause != null ? c.clause.toLocaleString() : "-"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/contracts/${c.id}`}>詳細</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(c.id)}
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
