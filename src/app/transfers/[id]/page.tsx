"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const TransferDetailView = dynamic(
  () => import("@/views/transfers/TransferDetailView").then((m) => m.TransferDetailView),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function TransferDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">移籍IDが指定されていません</p></div>;
  }

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">移籍情報を読み込み中...</p>}>
      <TransferDetailView id={id} />
    </Suspense>
  );
}
