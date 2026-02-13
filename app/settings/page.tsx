import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ThemeToggle } from "@/features/settings/components/ThemeToggle";
import { CsvImportForm } from "@/features/settings/components/CsvImportForm";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">設定</h1>

      <Card>
        <CardHeader>
          <CardTitle>表示設定</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              テーマを切り替えます。
            </p>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CSVインポート</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            クラブデータをCSVファイルから一括登録できます。
          </p>
          <CsvImportForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>権限管理</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            権限管理機能は今後のアップデートで追加予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
