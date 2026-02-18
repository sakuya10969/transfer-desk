"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const DashboardView = dynamic(
  () => import("@/views/dashboard/DashboardView").then((m) => m.DashboardView),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">ダッシュボードを読み込み中...</p>}>
      <DashboardView />
    </Suspense>
  );
}
