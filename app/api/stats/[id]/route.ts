import { NextResponse } from "next/server";

import {
  deleteStat,
  getStatById,
  updateStat,
  type UpdateStatInput,
} from "@/app/api/_lib/stats";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const stat = await getStatById(id);
    if (!stat) {
      return NextResponse.json({ message: "成績情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(stat);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "成績情報の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = await params;
  const body = await req.json();
  const input: UpdateStatInput = {
    season: body.season,
    player_id: body.playerId ?? body.player_id,
    club_id: body.clubId ?? body.club_id,
    matches:
      body.matches !== undefined && body.matches !== null
        ? Number(body.matches)
        : body.matches === null
          ? null
          : undefined,
    goals:
      body.goals !== undefined && body.goals !== null
        ? Number(body.goals)
        : body.goals === null
          ? null
          : undefined,
    assists:
      body.assists !== undefined && body.assists !== null
        ? Number(body.assists)
        : body.assists === null
          ? null
          : undefined,
  };
  try {
    const stat = await updateStat(id, input);
    if (!stat) {
      return NextResponse.json({ message: "成績情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(stat);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "成績情報の更新に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const deleted = await deleteStat(id);
    if (!deleted) {
      return NextResponse.json({ message: "成績情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(deleted);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "成績情報の削除に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
