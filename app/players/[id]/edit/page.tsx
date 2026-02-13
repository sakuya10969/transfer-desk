"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PlayerForm = dynamic(
  () => import("@/features/players/components/PlayerForm").then((m) => m.PlayerForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditPlayerPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-muted-foreground">選手IDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">選手フォームを読み込み中...</p>}>
        <PlayerForm playerId={id} />
      </Suspense>
    </div>
  );
}
