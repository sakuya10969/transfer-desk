import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { ClubDetailQuery } from "@/features/clubs/graphql/ClubDetailQuery";
import { CreateClubMutation } from "@/features/clubs/graphql/CreateClubMutation";
import { DeleteClubMutation } from "@/features/clubs/graphql/DeleteClubMutation";
import { ClubsListQuery } from "@/features/clubs/graphql/ClubsListQuery";
import { UpdateClubMutation } from "@/features/clubs/graphql/UpdateClubMutation";

const requireOperationText = (
  text: string | null | undefined,
  operationName: string,
) => {
  if (!text) {
    throw new Error(`${operationName} text is unavailable`);
  }
  return text;
};

export type CreateClubInput = {
  name: string;
  country: string | null;
  league: string | null;
  founded_year: number | null;
  stadium: string | null;
};

export type UpdateClubInput = Partial<CreateClubInput>;

type CreateClubResult = {
  insert_clubs_one: {
    id: string;
    name: string;
    country: string | null;
    league: string | null;
    founded_year: number | null;
    stadium: string | null;
  };
};

const CREATE_CLUB_MUTATION = requireOperationText(
  getRequest(CreateClubMutation).params.text,
  "CreateClubMutation",
);

export async function createClub(input: CreateClubInput) {
  const data = await hasuraFetch<CreateClubResult>(CREATE_CLUB_MUTATION, {
    object: input,
  });
  return data.insert_clubs_one;
}

type GetClubsResult = {
  clubs: Array<{
    id: string;
    name: string;
    country: string | null;
    league: string | null;
    founded_year: number | null;
    stadium: string | null;
  }>;
  clubs_aggregate?: {
    aggregate?: {
      count: number;
    } | null;
  } | null;
};

type ClubDetailResult = {
  clubs_by_pk: {
    id: string;
    name: string;
    country: string | null;
    league: string | null;
    founded_year: number | null;
    stadium: string | null;
    created_at: string;
    updated_at: string;
    players: unknown[];
    contracts: unknown[];
    transfersByToClubId: unknown[];
    transfers: unknown[];
    stats: unknown[];
  } | null;
};

type UpdateClubResult = {
  update_clubs_by_pk: {
    id: string;
    name: string;
    country: string | null;
    league: string | null;
    founded_year: number | null;
    stadium: string | null;
    updated_at: string;
  } | null;
};

type DeleteClubResult = {
  delete_clubs_by_pk: {
    id: string;
  } | null;
};

const CLUBS_QUERY = requireOperationText(
  getRequest(ClubsListQuery).params.text,
  "ClubsListQuery",
);
const CLUB_DETAIL_QUERY = requireOperationText(
  getRequest(ClubDetailQuery).params.text,
  "ClubDetailQuery",
);
const UPDATE_CLUB_MUTATION = requireOperationText(
  getRequest(UpdateClubMutation).params.text,
  "UpdateClubMutation",
);
const DELETE_CLUB_MUTATION = requireOperationText(
  getRequest(DeleteClubMutation).params.text,
  "DeleteClubMutation",
);

export async function getClubs(opts?: {
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const { limit = 100, offset = 0, search } = opts ?? {};
  const where = search
    ? {
        _or: [
          { name: { _ilike: `%${search}%` } },
          { country: { _ilike: `%${search}%` } },
          { league: { _ilike: `%${search}%` } },
        ],
      }
    : null;
  const data = await hasuraFetch<GetClubsResult>(CLUBS_QUERY, {
    limit,
    offset,
    where,
    order_by: [{ name: "asc" }],
  });
  return data.clubs;
}

export async function getClubById(id: string) {
  const data = await hasuraFetch<ClubDetailResult>(CLUB_DETAIL_QUERY, { id });
  return data.clubs_by_pk;
}

export async function updateClub(id: string, set: UpdateClubInput) {
  const data = await hasuraFetch<UpdateClubResult>(UPDATE_CLUB_MUTATION, {
    id,
    set,
  });
  return data.update_clubs_by_pk;
}

export async function deleteClub(id: string) {
  const data = await hasuraFetch<DeleteClubResult>(DELETE_CLUB_MUTATION, { id });
  return data.delete_clubs_by_pk;
}
