"use client";

import { useParams } from "next/navigation";
import { PlayerFormView } from "@/views/players/PlayerFormView";

export default function EditPlayerPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">選手IDが指定されていません</p></div>;
  }

  return <PlayerFormView playerId={id} />;
}
