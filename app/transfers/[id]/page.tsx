"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const TransferDetail = dynamic(
  () => import("@/features/transfers/components/TransferDetail").then((m) => m.TransferDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function TransferDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-sm text-muted-foreground">移籍IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">移籍情報を読み込み中...</p>}>
        <TransferDetail id={id} />
      </Suspense>
    </div>
  );
}
