"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const StatForm = dynamic(
  () => import("@/features/stats/ui/StatForm").then((m) => m.StatForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function StatFormView({ statId }: { statId?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">成績フォームを読み込み中...</p>}>
        <StatForm statId={statId} />
      </Suspense>
    </div>
  );
}
