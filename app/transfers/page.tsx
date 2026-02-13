import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui";

const TransferList = dynamic(
  () => import("@/features/transfers/components/TransferList").then((m) => m.TransferList),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function TransfersPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">移籍管理</h1>
        <Button asChild>
          <Link href="/transfers/new">移籍を登録</Link>
        </Button>
      </div>
      <TransferList />
    </div>
  );
}
