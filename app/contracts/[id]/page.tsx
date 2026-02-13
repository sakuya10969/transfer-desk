"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ContractDetail = dynamic(
  () => import("@/features/contracts/components/ContractDetail").then((m) => m.ContractDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ContractDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <ContractDetail id={params.id} />
    </div>
  );
}
