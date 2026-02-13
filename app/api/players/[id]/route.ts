import { NextResponse } from "next/server";

import {
  deletePlayer,
  getPlayerById,
  updatePlayer,
  type UpdatePlayerInput,
} from "@/app/api/_lib/players";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const player = await getPlayerById(id);
    if (!player) {
      return NextResponse.json({ message: "選手が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "選手詳細の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = await params;
  const body = await req.json();
  const input: UpdatePlayerInput = {
    name: body.name,
    position: body.position ?? null,
    nationality: body.nationality ?? null,
    birth_date: body.birthDate ?? body.birth_date ?? null,
    current_club_id: body.currentClubId ?? body.current_club_id ?? null,
  };
  try {
    const player = await updatePlayer(id, input);
    if (!player) {
      return NextResponse.json({ message: "選手が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(player);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "選手の更新に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const deleted = await deletePlayer(id);
    if (!deleted) {
      return NextResponse.json({ message: "選手が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(deleted);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "選手の削除に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
