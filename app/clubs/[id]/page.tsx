"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ClubDetail = dynamic(
  () => import("@/features/clubs/components/ClubDetail").then((m) => m.ClubDetail),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ClubDetailPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <ClubDetail id={params.id} />
    </div>
  );
}
