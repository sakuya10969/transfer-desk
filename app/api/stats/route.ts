import { NextResponse } from "next/server";

import { createStat, getStats, type CreateStatInput } from "@/app/api/_lib/stats";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10) || 100,
      500,
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const search = searchParams.get("search") ?? undefined;
    const season = searchParams.get("season") ?? undefined;

    const stats = await getStats({ limit, offset, search, season });
    return NextResponse.json(stats);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "成績情報の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { season, playerId, clubId, matches, goals, assists } = body;

  if (!season || !playerId || !clubId) {
    return NextResponse.json(
      { message: "season, playerId, clubId は必須です" },
      { status: 400 },
    );
  }

  const input: CreateStatInput = {
    season,
    player_id: playerId,
    club_id: clubId,
    matches: matches != null ? Number(matches) : 0,
    goals: goals != null ? Number(goals) : 0,
    assists: assists != null ? Number(assists) : 0,
  };

  try {
    const stat = await createStat(input);
    return NextResponse.json(stat, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "成績情報の登録に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
