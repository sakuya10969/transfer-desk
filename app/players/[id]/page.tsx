"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PlayerDetail = dynamic(
  () => import("@/features/players/components/PlayerDetail").then((m) => m.PlayerDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function PlayerDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <p className="text-sm text-muted-foreground">選手IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">選手情報を読み込み中...</p>}>
        <PlayerDetail id={id} />
      </Suspense>
    </div>
  );
}
