"use client";

import { useParams } from "next/navigation";
import { TransferFormView } from "@/views/transfers/TransferFormView";

export default function EditTransferPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">移籍IDが指定されていません</p></div>;
  }

  return <TransferFormView transferId={id} />;
}
