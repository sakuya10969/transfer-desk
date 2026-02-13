import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui";

const ContractList = dynamic(
  () => import("@/features/contracts/components/ContractList").then((m) => m.ContractList),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ContractsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">契約管理</h1>
        <Button asChild>
          <Link href="/contracts/new">契約を登録</Link>
        </Button>
      </div>
      <ContractList />
    </div>
  );
}
