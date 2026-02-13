"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ContractForm = dynamic(
  () => import("@/features/contracts/components/ContractForm").then((m) => m.ContractForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditContractPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <ContractForm contractId={params.id} />
    </div>
  );
}
