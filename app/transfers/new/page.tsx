"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const TransferForm = dynamic(
  () => import("@/features/transfers/components/TransferForm").then((m) => m.TransferForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function NewTransferPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">移籍フォームを読み込み中...</p>}>
        <TransferForm />
      </Suspense>
    </div>
  );
}
