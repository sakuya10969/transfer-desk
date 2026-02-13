"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ContractForm = dynamic(
  () => import("@/features/contracts/components/ContractForm").then((m) => m.ContractForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditContractPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-muted-foreground">契約IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">契約フォームを読み込み中...</p>}>
        <ContractForm contractId={id} />
      </Suspense>
    </div>
  );
}
