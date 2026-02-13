"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ClubForm = dynamic(
  () => import("@/features/clubs/components/ClubForm").then((m) => m.ClubForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditClubPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <ClubForm clubId={params.id} />
    </div>
  );
}
