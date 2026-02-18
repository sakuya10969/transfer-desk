"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { TransfersListQuery } from "@/entities/transfers/api/TransfersListQuery";
import { DeleteTransferMutation } from "@/entities/transfers/api/DeleteTransferMutation";
import type { TransfersListQuery as TransfersListQueryType } from "@/__generated__/TransfersListQuery.graphql";
import type { DeleteTransferMutation as DeleteTransferMutationType } from "@/__generated__/DeleteTransferMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/shared/ui";

const PAGE_SIZE = 20;
const normalizeDigits = (value: string): string =>
  value
    .replace(/[０-９]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) - 0xfee0),
    )
    .replace(/\D/g, "");

export function TransferList() {
  const [page, setPage] = useState<number>(0);
  const [yearInput, setYearInput] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const where = yearFilter !== null
    ? { transfer_year: { _eq: yearFilter } }
    : {};

  const queryVars = {
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    where,
    order_by: [{ transfer_year: "desc" }, { transfer_month: "desc" }],
  } as const;

  const data = useLazyLoadQuery<TransfersListQueryType>(TransfersListQuery, queryVars, { fetchPolicy: "store-and-network" });

  const [commitDelete] = useMutation<DeleteTransferMutationType>(DeleteTransferMutation);
  const [, setRefetchKey] = useState<number>(0);

  const totalCount = data.transfers_aggregate.aggregate?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("この移籍記録を削除しますか？")) return;
      commitDelete({
        variables: { id },
        updater: (store) => {
          store.delete(`transfers:${id}`);
        },
        onCompleted: () => setRefetchKey((k) => k + 1),
      });
    },
    [commitDelete],
  );

  const handleSearch = useCallback(() => {
    const normalizedYear = normalizeDigits(yearInput.trim());
    setYearFilter(normalizedYear ? Number(normalizedYear) : null);
    setYearInput(normalizedYear);
    setPage(0);
  }, [yearInput]);

  const handleClear = useCallback(() => {
    setYearInput("");
    setYearFilter(null);
    setPage(0);
  }, []);

  return (
    <div className="space-y-6">
      <form
        className="flex items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Input
          placeholder="年で絞り込み（例: 2024）"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          className="max-w-48"
          inputMode="numeric"
        />
        <Button type="submit" variant="outline">
          検索
        </Button>
        {yearFilter !== null && (
          <Button type="button" variant="ghost" onClick={handleClear}>
            クリア
          </Button>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          {totalCount} 件
        </span>
      </form>

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
                        {t.club ? (
                          <Link
                            href={`/clubs/${t.club.id}`}
                            className="text-primary hover:underline"
                          >
                            {t.club.name}
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/clubs/${t.clubByToClubId.id}`}
                          className="text-primary hover:underline"
                        >
                          {t.clubByToClubId.name}
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
