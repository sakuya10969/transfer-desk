import { NextResponse } from "next/server";

import {
  deleteClub,
  getClubById,
  updateClub,
  type UpdateClubInput,
} from "@/app/api/_lib/clubs";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const club = await getClubById(id);
    if (!club) {
      return NextResponse.json({ message: "クラブが見つかりません" }, { status: 404 });
    }
    return NextResponse.json(club);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "クラブ詳細の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = await params;
  const body = await req.json();
  const input: UpdateClubInput = {
    name: body.name,
    country: body.country ?? null,
    league: body.league ?? null,
    founded_year:
      body.foundedYear !== undefined && body.foundedYear !== null
        ? Number(body.foundedYear)
        : body.founded_year !== undefined && body.founded_year !== null
          ? Number(body.founded_year)
          : undefined,
    stadium: body.stadium ?? null,
  };
  try {
    const club = await updateClub(id, input);
    if (!club) {
      return NextResponse.json({ message: "クラブが見つかりません" }, { status: 404 });
    }
    return NextResponse.json(club);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "クラブの更新に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const deleted = await deleteClub(id);
    if (!deleted) {
      return NextResponse.json({ message: "クラブが見つかりません" }, { status: 404 });
    }
    return NextResponse.json(deleted);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "クラブの削除に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
