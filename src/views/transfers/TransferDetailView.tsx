"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLazyLoadQuery, useMutation } from "react-relay";

import { TransferDetailQuery } from "@/entities/transfers/api/TransferDetailQuery";
import { DeleteTransferMutation } from "@/entities/transfers/api/DeleteTransferMutation";
import type { TransferDetailQuery as TransferDetailQueryType } from "@/__generated__/TransferDetailQuery.graphql";
import type { DeleteTransferMutation as DeleteTransferMutationType } from "@/__generated__/DeleteTransferMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/shared/ui";

export function TransferDetailView({ id }: { id: string }) {
  const router = useRouter();
  const data = useLazyLoadQuery<TransferDetailQueryType>(TransferDetailQuery, { id });
  const [commitDelete] = useMutation<DeleteTransferMutationType>(DeleteTransferMutation);

  const transfer = data.transfers_by_pk;
  if (!transfer) {
    return <p className="p-6 text-muted-foreground">移籍記録が見つかりません</p>;
  }

  const handleDelete = () => {
    if (!confirm("この移籍記録を削除しますか？")) return;
    commitDelete({
      variables: { id },
      onCompleted: () => router.push("/transfers"),
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">移籍詳細</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/transfers/${id}/edit`}>編集</Link>
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="outline" asChild>
            <Link href="/transfers">一覧に戻る</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>移籍情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">選手</dt>
              <dd>
                <Link
                  href={`/players/${transfer.player.id}`}
                  className="text-primary hover:underline"
                >
                  {transfer.player.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">時期</dt>
              <dd>
                {transfer.transfer_year}/{transfer.transfer_month}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">移籍元</dt>
              <dd>
                {transfer.club ? (
                  <Link
                    href={`/clubs/${transfer.club.id}`}
                    className="text-primary hover:underline"
                  >
                    {transfer.club.name}
                  </Link>
                ) : (
                  "-"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">移籍先</dt>
              <dd>
                <Link
                  href={`/clubs/${transfer.clubByToClubId.id}`}
                  className="text-primary hover:underline"
                >
                  {transfer.clubByToClubId.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">種別</dt>
              <dd>{transfer.type}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">移籍金</dt>
              <dd>
                {transfer.fee != null ? transfer.fee.toLocaleString() : "-"}
              </dd>
            </div>
            {transfer.type === "LOAN" && (
              <>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    ローン終了年
                  </dt>
                  <dd>{transfer.loan_end_year ?? "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    ローン終了月
                  </dt>
                  <dd>{transfer.loan_end_month ?? "-"}</dd>
                </div>
              </>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
