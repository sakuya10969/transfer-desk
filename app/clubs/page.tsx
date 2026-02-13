import dynamic from "next/dynamic";
import Link from "next/link";

import { Button } from "@/components/ui";

const ClubList = dynamic(
  () => import("@/features/clubs/components/ClubList").then((m) => m.ClubList),
  { ssr: false, loading: () => <p className="text-sm text-muted-foreground">読み込み中...</p> },
);

export default function ClubsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">クラブ管理</h1>
        <Button asChild>
          <Link href="/clubs/new">クラブを登録</Link>
        </Button>
      </div>
      <ClubList />
    </div>
  );
}
