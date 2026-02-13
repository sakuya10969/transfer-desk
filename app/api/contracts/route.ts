import { NextResponse } from "next/server";

import {
  createContract,
  getContracts,
  type CreateContractInput,
} from "@/app/api/_lib/contracts";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10) || 100,
      500,
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const search = searchParams.get("search") ?? undefined;

    const contracts = await getContracts({ limit, offset, search });
    return NextResponse.json(contracts);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "契約の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { playerId, clubId, startDate, endDate, salary, clause } = body;

  if (!playerId || !clubId || !startDate) {
    return NextResponse.json(
      { message: "playerId, clubId, startDate は必須です" },
      { status: 400 },
    );
  }

  const input: CreateContractInput = {
    player_id: playerId,
    club_id: clubId,
    start_date: startDate,
    end_date: endDate || null,
    salary: salary != null ? Number(salary) : null,
    clause: clause != null ? Number(clause) : null,
  };

  try {
    const contract = await createContract(input);
    return NextResponse.json(contract, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "契約の登録に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
