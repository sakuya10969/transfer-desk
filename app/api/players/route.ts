import { NextResponse } from "next/server";
import {
  createPlayer,
  getPlayers,
  type CreatePlayerInput,
} from "@/app/api/_lib/players";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10) || 100,
      500
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const search = searchParams.get("search") ?? undefined;
    const position = searchParams.get("position") ?? undefined;

    const players = await getPlayers({ limit, offset, search, position });
    return NextResponse.json(players);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "選手の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const { name, position, nationality, birthDate, currentClubId } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { message: "name は必須です" },
      { status: 400 }
    );
  }

  const input: CreatePlayerInput = {
    name,
    position: position || null,
    nationality: nationality || null,
    birth_date: birthDate || null,
    current_club_id: currentClubId || null,
  };

  try {
    const player = await createPlayer(input);
    return NextResponse.json(player, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "選手の登録に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
