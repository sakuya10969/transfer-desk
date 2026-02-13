import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { ContractDetailQuery } from "@/features/contracts/graphql/ContractDetailQuery";
import { ContractsListQuery } from "@/features/contracts/graphql/ContractsListQuery";
import { CreateContractMutation } from "@/features/contracts/graphql/CreateContractMutation";
import { DeleteContractMutation } from "@/features/contracts/graphql/DeleteContractMutation";
import { UpdateContractMutation } from "@/features/contracts/graphql/UpdateContractMutation";

const requireOperationText = (
  text: string | null | undefined,
  operationName: string,
) => {
  if (!text) throw new Error(`${operationName} text is unavailable`);
  return text;
};

export type CreateContractInput = {
  player_id: string;
  club_id: string;
  start_date: string;
  end_date?: string | null;
  salary?: number | null;
  clause?: number | null;
};

export type UpdateContractInput = Partial<CreateContractInput>;

type ContractListItem = {
  id: string;
  start_date: string;
  end_date: string | null;
  salary: number | null;
  clause: number | null;
  player: { id: string; name: string };
  club: { id: string; name: string };
};

type GetContractsResult = {
  contracts: ContractListItem[];
};

type ContractDetailResult = {
  contracts_by_pk: ContractListItem & {
    created_at: string;
    updated_at: string;
  } | null;
};

type CreateContractResult = {
  insert_contracts_one: {
    id: string;
    player_id: string;
    club_id: string;
    start_date: string;
    end_date: string | null;
    salary: number | null;
    clause: number | null;
  } | null;
};

type UpdateContractResult = {
  update_contracts_by_pk: {
    id: string;
    start_date: string;
    end_date: string | null;
    salary: number | null;
    clause: number | null;
    updated_at: string;
  } | null;
};

type DeleteContractResult = {
  delete_contracts_by_pk: { id: string } | null;
};

const CONTRACTS_LIST_QUERY = requireOperationText(
  getRequest(ContractsListQuery).params.text,
  "ContractsListQuery",
);
const CONTRACT_DETAIL_QUERY = requireOperationText(
  getRequest(ContractDetailQuery).params.text,
  "ContractDetailQuery",
);
const CREATE_CONTRACT_MUTATION = requireOperationText(
  getRequest(CreateContractMutation).params.text,
  "CreateContractMutation",
);
const UPDATE_CONTRACT_MUTATION = requireOperationText(
  getRequest(UpdateContractMutation).params.text,
  "UpdateContractMutation",
);
const DELETE_CONTRACT_MUTATION = requireOperationText(
  getRequest(DeleteContractMutation).params.text,
  "DeleteContractMutation",
);

export async function getContracts(opts?: {
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
        ],
      }
    : null;
  const data = await hasuraFetch<GetContractsResult>(CONTRACTS_LIST_QUERY, {
    limit,
    offset,
    where,
    order_by: [{ start_date: "desc" }],
  });
  return data.contracts;
}

export async function getContractById(id: string) {
  const data = await hasuraFetch<ContractDetailResult>(CONTRACT_DETAIL_QUERY, {
    id,
  });
  return data.contracts_by_pk;
}

export async function createContract(object: CreateContractInput) {
  const data = await hasuraFetch<CreateContractResult>(CREATE_CONTRACT_MUTATION, {
    object,
  });
  return data.insert_contracts_one;
}

export async function updateContract(id: string, set: UpdateContractInput) {
  const data = await hasuraFetch<UpdateContractResult>(UPDATE_CONTRACT_MUTATION, {
    id,
    set,
  });
  return data.update_contracts_by_pk;
}

export async function deleteContract(id: string) {
  const data = await hasuraFetch<DeleteContractResult>(DELETE_CONTRACT_MUTATION, {
    id,
  });
  return data.delete_contracts_by_pk;
}
