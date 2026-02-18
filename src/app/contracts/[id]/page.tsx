"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ContractDetailView = dynamic(
  () => import("@/views/contracts/ContractDetailView").then((m) => m.ContractDetailView),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">契約IDが指定されていません</p></div>;
  }

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">契約情報を読み込み中...</p>}>
      <ContractDetailView id={id} />
    </Suspense>
  );
}
