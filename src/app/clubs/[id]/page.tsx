"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ClubDetailView = dynamic(
  () => import("@/views/clubs/ClubDetailView").then((m) => m.ClubDetailView),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ClubDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">クラブIDが指定されていません</p></div>;
  }

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">クラブ情報を読み込み中...</p>}>
      <ClubDetailView id={id} />
    </Suspense>
  );
}
