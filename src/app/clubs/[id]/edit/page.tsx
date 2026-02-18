"use client";

import { useParams } from "next/navigation";
import { ClubFormView } from "@/views/clubs/ClubFormView";

export default function EditClubPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">クラブIDが指定されていません</p></div>;
  }

  return <ClubFormView clubId={id} />;
}
