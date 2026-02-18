"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ClubForm = dynamic(
  () => import("@/features/clubs/ui/ClubForm").then((m) => m.ClubForm),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export function ClubFormView({ clubId }: { clubId?: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense fallback={<p className="text-sm text-muted-foreground">クラブフォームを読み込み中...</p>}>
        <ClubForm clubId={clubId} />
      </Suspense>
    </div>
  );
}
