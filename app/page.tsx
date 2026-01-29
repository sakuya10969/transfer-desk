import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">TransferDesk</h1>
        <p className="text-muted-foreground">
          サッカークラブ・選手・移籍情報を管理するデータベースツール
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>初期セットアップ</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            クラブを登録すると、選手管理や移籍履歴の記録を開始できます。
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/clubs/new">クラブを登録</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/clubs">クラブ一覧を表示</Link>
            </Button>
          </div>

          <Separator />

          <div className="text-sm text-muted-foreground">
            次のステップ：クラブ詳細の作成 → 選手登録 → 移籍履歴の管理
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
