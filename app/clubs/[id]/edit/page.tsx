"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ClubForm = dynamic(
  () => import("@/features/clubs/components/ClubForm").then((m) => m.ClubForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function EditClubPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="text-sm text-muted-foreground">クラブIDが指定されていません</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">クラブフォームを読み込み中...</p>}>
        <ClubForm clubId={id} />
      </Suspense>
    </div>
  );
}
