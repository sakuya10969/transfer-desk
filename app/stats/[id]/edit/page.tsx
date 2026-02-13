"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const StatForm = dynamic(
  () => import("@/features/stats/components/StatForm").then((m) => m.StatForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditStatPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-muted-foreground">成績IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">成績フォームを読み込み中...</p>}>
        <StatForm statId={id} />
      </Suspense>
    </div>
  );
}
