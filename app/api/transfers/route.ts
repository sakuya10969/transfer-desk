import { NextResponse } from "next/server";

import {
  createTransfer,
  getTransfers,
  type CreateTransferInput,
} from "@/app/api/_lib/transfers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? "100", 10) || 100,
      500,
    );
    const offset = parseInt(searchParams.get("offset") ?? "0", 10) || 0;
    const search = searchParams.get("search") ?? undefined;

    const transfers = await getTransfers({ limit, offset, search });
    return NextResponse.json(transfers);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "移籍情報の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    playerId,
    fromClubId,
    toClubId,
    transferYear,
    transferMonth,
    type,
    fee,
    loanEndYear,
    loanEndMonth,
  } = body;

  if (!playerId || !toClubId || !transferYear || !transferMonth) {
    return NextResponse.json(
      { message: "playerId, toClubId, transferYear, transferMonth は必須です" },
      { status: 400 },
    );
  }

  const input: CreateTransferInput = {
    player_id: playerId,
    from_club_id: fromClubId || null,
    to_club_id: toClubId,
    transfer_year: Number(transferYear),
    transfer_month: Number(transferMonth),
    type: type || null,
    fee: fee != null ? Number(fee) : null,
    loan_end_year: loanEndYear != null ? Number(loanEndYear) : null,
    loan_end_month: loanEndMonth != null ? Number(loanEndMonth) : null,
  };

  try {
    const transfer = await createTransfer(input);
    return NextResponse.json(transfer, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "移籍情報の登録に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
