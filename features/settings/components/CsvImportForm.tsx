"use client";

import { useState } from "react";
import { Button, Input } from "@/components/ui";

export function CsvImportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus("error");
      setMessage("ファイルを選択してください");
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/import/clubs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message ?? "インポートに失敗しました");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "インポートが完了しました");
      setFile(null);
    } catch {
      setStatus("error");
      setMessage("ネットワークエラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="file"
          accept=".csv,.txt"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="max-w-xs"
        />
        <Button type="submit" disabled={status === "loading" || !file}>
          {status === "loading" ? "インポート中..." : "クラブをインポート"}
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        CSV形式: name（必須）, country, league, founded_year, stadium
        <br />
        例: name,country,league,founded_year,stadium
        <br />
        Liverpool,England,Premier League,1892,Anfield
      </p>
    </form>
  );
}
