"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PlayerDetailView = dynamic(
  () => import("@/views/players/PlayerDetailView").then((m) => m.PlayerDetailView),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function PlayerDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">選手IDが指定されていません</p></div>;
  }

  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">選手情報を読み込み中...</p>}>
      <PlayerDetailView id={id} />
    </Suspense>
  );
}
