"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const StatForm = dynamic(
  () => import("@/features/stats/components/StatForm").then((m) => m.StatForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditStatPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <StatForm statId={params.id} />
    </div>
  );
}
