import { NextResponse } from "next/server";

import { getDashboard } from "@/app/api/_lib/dashboard";

export async function GET() {
  try {
    const dashboard = await getDashboard();
    return NextResponse.json(dashboard);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "ダッシュボード情報の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
