"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ClubDetail = dynamic(
  () => import("@/features/clubs/components/ClubDetail").then((m) => m.ClubDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ClubDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <p className="text-sm text-muted-foreground">クラブIDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">クラブ情報を読み込み中...</p>}>
        <ClubDetail id={id} />
      </Suspense>
    </div>
  );
}
