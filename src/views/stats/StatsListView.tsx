"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/shared/ui";

const StatsList = dynamic(
  () => import("@/entities/stats/ui/StatsList").then((m) => m.StatsList),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function StatsListView() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">成績管理</h1>
        <Button asChild>
          <Link href="/stats/new">成績を登録</Link>
        </Button>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">成績一覧を読み込み中...</p>}>
        <StatsList />
      </Suspense>
    </div>
  );
}
