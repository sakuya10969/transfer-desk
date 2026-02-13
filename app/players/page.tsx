"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui";

const PlayerList = dynamic(
  () => import("@/features/players/components/PlayerList").then((m) => m.PlayerList),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function PlayersPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">選手管理</h1>
        <Button asChild>
          <Link href="/players/new">選手を登録</Link>
        </Button>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">選手一覧を読み込み中...</p>}>
        <PlayerList />
      </Suspense>
    </div>
  );
}
