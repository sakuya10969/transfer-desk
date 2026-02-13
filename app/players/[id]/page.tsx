"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PlayerDetail = dynamic(
  () => import("@/features/players/components/PlayerDetail").then((m) => m.PlayerDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function PlayerDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <PlayerDetail id={params.id} />
    </div>
  );
}
