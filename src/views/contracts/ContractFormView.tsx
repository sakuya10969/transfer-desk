"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ContractForm = dynamic(
  () => import("@/features/contracts/ui/ContractForm").then((m) => m.ContractForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function ContractFormView({ contractId }: { contractId?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">契約フォームを読み込み中...</p>}>
        <ContractForm contractId={contractId} />
      </Suspense>
    </div>
  );
}
