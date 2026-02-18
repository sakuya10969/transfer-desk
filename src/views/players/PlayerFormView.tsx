"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const PlayerForm = dynamic(
  () => import("@/features/players/ui/PlayerForm").then((m) => m.PlayerForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function PlayerFormView({ playerId }: { playerId?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">選手フォームを読み込み中...</p>}>
        <PlayerForm playerId={playerId} />
      </Suspense>
    </div>
  );
}
