import { NextResponse } from "next/server";

import {
  deleteTransfer,
  getTransferById,
  updateTransfer,
  type UpdateTransferInput,
} from "@/app/api/_lib/transfers";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const transfer = await getTransferById(id);
    if (!transfer) {
      return NextResponse.json({ message: "移籍情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(transfer);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "移籍情報の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = await params;
  const body = await req.json();
  const input: UpdateTransferInput = {
    player_id: body.playerId ?? body.player_id,
    from_club_id:
      body.fromClubId !== undefined
        ? body.fromClubId
        : body.from_club_id !== undefined
          ? body.from_club_id
          : undefined,
    to_club_id: body.toClubId ?? body.to_club_id,
    transfer_year:
      body.transferYear !== undefined
        ? Number(body.transferYear)
        : body.transfer_year !== undefined
          ? Number(body.transfer_year)
          : undefined,
    transfer_month:
      body.transferMonth !== undefined
        ? Number(body.transferMonth)
        : body.transfer_month !== undefined
          ? Number(body.transfer_month)
          : undefined,
    type: body.type ?? undefined,
    fee:
      body.fee !== undefined && body.fee !== null
        ? Number(body.fee)
        : body.fee === null
          ? null
          : undefined,
    loan_end_year:
      body.loanEndYear !== undefined && body.loanEndYear !== null
        ? Number(body.loanEndYear)
        : body.loan_end_year !== undefined && body.loan_end_year !== null
          ? Number(body.loan_end_year)
          : body.loanEndYear === null || body.loan_end_year === null
            ? null
            : undefined,
    loan_end_month:
      body.loanEndMonth !== undefined && body.loanEndMonth !== null
        ? Number(body.loanEndMonth)
        : body.loan_end_month !== undefined && body.loan_end_month !== null
          ? Number(body.loan_end_month)
          : body.loanEndMonth === null || body.loan_end_month === null
            ? null
            : undefined,
  };
  try {
    const transfer = await updateTransfer(id, input);
    if (!transfer) {
      return NextResponse.json({ message: "移籍情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(transfer);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "移籍情報の更新に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const deleted = await deleteTransfer(id);
    if (!deleted) {
      return NextResponse.json({ message: "移籍情報が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(deleted);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "移籍情報の削除に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
