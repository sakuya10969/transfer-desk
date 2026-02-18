"use client";

import { useParams } from "next/navigation";
import { ContractFormView } from "@/views/contracts/ContractFormView";

export default function EditContractPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    return <div className="p-6"><p className="text-sm text-muted-foreground">契約IDが指定されていません</p></div>;
  }

  return <ContractFormView contractId={id} />;
}
