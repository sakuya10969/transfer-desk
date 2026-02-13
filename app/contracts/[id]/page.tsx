"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ContractDetail = dynamic(
  () => import("@/features/contracts/components/ContractDetail").then((m) => m.ContractDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-sm text-muted-foreground">契約IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">契約情報を読み込み中...</p>}>
        <ContractDetail id={id} />
      </Suspense>
    </div>
  );
}
