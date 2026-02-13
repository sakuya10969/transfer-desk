import { NextResponse } from "next/server";

import {
  deleteContract,
  getContractById,
  updateContract,
  type UpdateContractInput,
} from "@/app/api/_lib/contracts";

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const contract = await getContractById(id);
    if (!contract) {
      return NextResponse.json({ message: "契約が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(contract);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "契約詳細の取得に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Context) {
  const { id } = await params;
  const body = await req.json();
  const input: UpdateContractInput = {
    player_id: body.playerId ?? body.player_id,
    club_id: body.clubId ?? body.club_id,
    start_date: body.startDate ?? body.start_date,
    end_date:
      body.endDate !== undefined
        ? body.endDate
        : body.end_date !== undefined
          ? body.end_date
          : undefined,
    salary:
      body.salary !== undefined && body.salary !== null
        ? Number(body.salary)
        : body.salary === null
          ? null
          : undefined,
    clause:
      body.clause !== undefined && body.clause !== null
        ? Number(body.clause)
        : body.clause === null
          ? null
          : undefined,
  };
  try {
    const contract = await updateContract(id, input);
    if (!contract) {
      return NextResponse.json({ message: "契約が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(contract);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "契約の更新に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const { id } = await params;
  try {
    const deleted = await deleteContract(id);
    if (!deleted) {
      return NextResponse.json({ message: "契約が見つかりません" }, { status: 404 });
    }
    return NextResponse.json(deleted);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "契約の削除に失敗しました";
    return NextResponse.json({ message }, { status: 500 });
  }
}
