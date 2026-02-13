"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { ContractDetailQuery } from "@/features/contracts/graphql/ContractDetailQuery";
import { DeleteContractMutation } from "@/features/contracts/graphql/DeleteContractMutation";
import type { ContractDetailQuery as ContractDetailQueryType } from "@/__generated__/ContractDetailQuery.graphql";
import type { DeleteContractMutation as DeleteContractMutationType } from "@/__generated__/DeleteContractMutation.graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";

export function ContractDetail({ id }: { id: string }) {
  const router = useRouter();
  const data = useLazyLoadQuery<ContractDetailQueryType>(ContractDetailQuery, { id });
  const [commitDelete] = useMutation<DeleteContractMutationType>(DeleteContractMutation);

  const contract = data.contracts_by_pk;
  if (!contract) {
    return <p className="p-6 text-muted-foreground">契約が見つかりません</p>;
  }

  const handleDelete = () => {
    if (!confirm("この契約を削除しますか？")) return;
    commitDelete({
      variables: { id },
      onCompleted: () => router.push("/contracts"),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">契約詳細</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/contracts/${id}/edit`}>編集</Link>
          </Button>
          <Button variant="outline" onClick={handleDelete}>
            削除
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contracts">一覧に戻る</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">選手</dt>
              <dd>
                <Link
                  href={`/players/${contract.player.id}`}
                  className="text-primary hover:underline"
                >
                  {contract.player.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">クラブ</dt>
              <dd>
                <Link
                  href={`/clubs/${contract.club.id}`}
                  className="text-primary hover:underline"
                >
                  {contract.club.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">開始日</dt>
              <dd>{contract.start_date?.slice(0, 10) ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">終了日</dt>
              <dd>{contract.end_date?.slice(0, 10) ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">年俸</dt>
              <dd>
                {contract.salary != null
                  ? contract.salary.toLocaleString()
                  : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">違約金</dt>
              <dd>
                {contract.clause != null
                  ? contract.clause.toLocaleString()
                  : "-"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
