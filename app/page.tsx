"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/features/dashboard/components/Dashboard").then((m) => m.Dashboard),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">TransferDesk</h1>
        <p className="text-muted-foreground">
          サッカークラブ・選手・移籍情報の管理システム
        </p>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">ダッシュボードを読み込み中...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
