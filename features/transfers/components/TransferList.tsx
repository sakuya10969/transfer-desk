"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { TransfersListQuery } from "@/features/transfers/graphql/TransfersListQuery";
import { DeleteTransferMutation } from "@/features/transfers/graphql/DeleteTransferMutation";
import type { TransfersListQuery as TransfersListQueryType } from "@/__generated__/TransfersListQuery.graphql";
import type { DeleteTransferMutation as DeleteTransferMutationType } from "@/__generated__/DeleteTransferMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/components/ui";

const PAGE_SIZE = 20;

export function TransferList() {
  const [page, setPage] = useState(0);
  const [yearFilter, setYearFilter] = useState("");

  const where = yearFilter
    ? { transfer_year: { _eq: Number(yearFilter) } }
    : {};

  const data = useLazyLoadQuery<TransfersListQueryType>(TransfersListQuery, {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where,
    order_by: [{ transfer_year: "desc" as any }, { transfer_month: "desc" as any }],
  }, { fetchPolicy: "network-only" });

  const [commitDelete] = useMutation<DeleteTransferMutationType>(DeleteTransferMutation);

  const totalCount = data.transfers_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("この移籍記録を削除しますか？")) return;
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
          placeholder="年で絞り込み（例: 2024）"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(0);
          }}
          className="max-w-48"
          inputMode="numeric"
        />
        {yearFilter && (
          <Button variant="ghost" onClick={() => setYearFilter("")}>
            クリア
          </Button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          {totalCount} 件
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>移籍履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {data.transfers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              登録された移籍はありません
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">時期</th>
                    <th className="pb-2 font-medium">選手</th>
                    <th className="pb-2 font-medium">移籍元</th>
                    <th className="pb-2 font-medium">移籍先</th>
                    <th className="pb-2 font-medium">種別</th>
                    <th className="pb-2 font-medium">移籍金</th>
                    <th className="pb-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transfers.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-3">
                        {t.transfer_year}/{t.transfer_month}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/players/${t.player.id}`}
                          className="text-primary hover:underline"
                        >
                          {t.player.name}
                        </Link>
                      </td>
                      <td className="py-3">
                        {t.from_club ? (
                          <Link
                            href={`/clubs/${t.from_club.id}`}
                            className="text-primary hover:underline"
                          >
                            {t.from_club.name}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/clubs/${t.to_club.id}`}
                          className="text-primary hover:underline"
                        >
                          {t.to_club.name}
                        </Link>
                      </td>
                      <td className="py-3">{t.type}</td>
                      <td className="py-3">
                        {t.fee != null ? t.fee.toLocaleString() : "-"}
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/transfers/${t.id}`}>詳細</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(t.id)}
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
