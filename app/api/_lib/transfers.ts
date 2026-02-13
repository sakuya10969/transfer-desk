import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { CreateTransferMutation } from "@/features/transfers/graphql/CreateTransferMutation";
import { DeleteTransferMutation } from "@/features/transfers/graphql/DeleteTransferMutation";
import { TransferDetailQuery } from "@/features/transfers/graphql/TransferDetailQuery";
import { TransfersListQuery } from "@/features/transfers/graphql/TransfersListQuery";
import { UpdateTransferMutation } from "@/features/transfers/graphql/UpdateTransferMutation";

const requireOperationText = (
  text: string | null | undefined,
  operationName: string,
) => {
  if (!text) throw new Error(`${operationName} text is unavailable`);
  return text;
};

export type CreateTransferInput = {
  player_id: string;
  from_club_id?: string | null;
  to_club_id: string;
  transfer_year: number;
  transfer_month: number;
  type?: string | null;
  fee?: number | null;
  loan_end_year?: number | null;
  loan_end_month?: number | null;
};

export type UpdateTransferInput = Partial<CreateTransferInput>;

type TransferListItem = {
  id: string;
  transfer_year: number;
  transfer_month: number;
  type: string;
  fee: number | null;
  player: { id: string; name: string };
  club: { id: string; name: string } | null;
  clubByToClubId: { id: string; name: string };
};

type GetTransfersResult = {
  transfers: TransferListItem[];
};

type TransferDetailResult = {
  transfers_by_pk: (TransferListItem & {
    loan_end_year: number | null;
    loan_end_month: number | null;
    created_at: string;
  }) | null;
};

type CreateTransferResult = {
  insert_transfers_one: {
    id: string;
    player_id: string;
    from_club_id: string | null;
    to_club_id: string;
    transfer_year: number;
    transfer_month: number;
    type: string;
    fee: number | null;
  } | null;
};

type UpdateTransferResult = {
  update_transfers_by_pk: {
    id: string;
    transfer_year: number;
    transfer_month: number;
    type: string;
    fee: number | null;
    loan_end_year: number | null;
    loan_end_month: number | null;
  } | null;
};

type DeleteTransferResult = {
  delete_transfers_by_pk: { id: string } | null;
};

const TRANSFERS_LIST_QUERY = requireOperationText(
  getRequest(TransfersListQuery).params.text,
  "TransfersListQuery",
);
const TRANSFER_DETAIL_QUERY = requireOperationText(
  getRequest(TransferDetailQuery).params.text,
  "TransferDetailQuery",
);
const CREATE_TRANSFER_MUTATION = requireOperationText(
  getRequest(CreateTransferMutation).params.text,
  "CreateTransferMutation",
);
const UPDATE_TRANSFER_MUTATION = requireOperationText(
  getRequest(UpdateTransferMutation).params.text,
  "UpdateTransferMutation",
);
const DELETE_TRANSFER_MUTATION = requireOperationText(
  getRequest(DeleteTransferMutation).params.text,
  "DeleteTransferMutation",
);

export async function getTransfers(opts?: {
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const { limit = 100, offset = 0, search } = opts ?? {};
  const where = search
    ? {
        _or: [
          { player: { name: { _ilike: `%${search}%` } } },
          { club: { name: { _ilike: `%${search}%` } } },
          { clubByToClubId: { name: { _ilike: `%${search}%` } } },
        ],
      }
    : null;

  const data = await hasuraFetch<GetTransfersResult>(TRANSFERS_LIST_QUERY, {
    limit,
    offset,
    where,
    order_by: [{ transfer_year: "desc" }, { transfer_month: "desc" }],
  });
  return data.transfers;
}

export async function getTransferById(id: string) {
  const data = await hasuraFetch<TransferDetailResult>(TRANSFER_DETAIL_QUERY, {
    id,
  });
  return data.transfers_by_pk;
}

export async function createTransfer(object: CreateTransferInput) {
  const data = await hasuraFetch<CreateTransferResult>(CREATE_TRANSFER_MUTATION, {
    object,
  });
  return data.insert_transfers_one;
}

export async function updateTransfer(id: string, set: UpdateTransferInput) {
  const data = await hasuraFetch<UpdateTransferResult>(UPDATE_TRANSFER_MUTATION, {
    id,
    set,
  });
  return data.update_transfers_by_pk;
}

export async function deleteTransfer(id: string) {
  const data = await hasuraFetch<DeleteTransferResult>(DELETE_TRANSFER_MUTATION, {
    id,
  });
  return data.delete_transfers_by_pk;
}
