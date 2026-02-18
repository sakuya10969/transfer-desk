"use client";

import { useParams } from "next/navigation";
import { StatFormView } from "@/views/stats/StatFormView";

export default function EditStatPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">成績IDが指定されていません</p></div>;
  }

  return <StatFormView statId={id} />;
}
