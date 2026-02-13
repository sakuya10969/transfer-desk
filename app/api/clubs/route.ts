import { NextResponse } from "next/server";
import { createClub, getClubs, type CreateClubInput } from "@/app/api/_lib/clubs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10) || 100,
      500
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const search = searchParams.get("search") ?? undefined;

    const clubs = await getClubs({ limit, offset, search });
    return NextResponse.json(clubs);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "クラブの取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const { name, country, league, foundedYear, stadium } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { message: "name は必須です" },
      { status: 400 },
    );
  }

  const input: CreateClubInput = {
    name,
    country: country || null,
    league: league || null,
    founded_year: foundedYear != null ? Number(foundedYear) : null,
    stadium: stadium || null,
  };

  try {
    const club = await createClub(input);
    return NextResponse.json(club, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "クラブの登録に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
