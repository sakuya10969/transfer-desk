"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const TransferForm = dynamic(
  () => import("@/features/transfers/components/TransferForm").then((m) => m.TransferForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditTransferPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-muted-foreground">移籍IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">移籍フォームを読み込み中...</p>}>
        <TransferForm transferId={id} />
      </Suspense>
    </div>
  );
}
