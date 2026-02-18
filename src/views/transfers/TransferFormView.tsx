"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const TransferForm = dynamic(
  () => import("@/features/transfers/ui/TransferForm").then((m) => m.TransferForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function TransferFormView({ transferId }: { transferId?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">移籍フォームを読み込み中...</p>}>
        <TransferForm transferId={transferId} />
      </Suspense>
    </div>
  );
}
