import { hasuraFetch } from "@/app/api/_lib/hasuraClient";
import { getRequest } from "relay-runtime";

import { CreatePlayerMutation } from "@/features/players/graphql/CreatePlayerMutation";
import { DeletePlayerMutation } from "@/features/players/graphql/DeletePlayerMutation";
import { PlayerDetailQuery } from "@/features/players/graphql/PlayerDetailQuery";
import { PlayersListQuery } from "@/features/players/graphql/PlayersListQuery";
import { UpdatePlayerMutation } from "@/features/players/graphql/UpdatePlayerMutation";

const requireOperationText = (
  text: string | null | undefined,
  operationName: string,
) => {
  if (!text) {
    throw new Error(`${operationName} text is unavailable`);
  }
  return text;
};

export type CreatePlayerInput = {
  name: string;
  position?: string | null;
  nationality?: string | null;
  birth_date?: string | null;
  current_club_id?: string | null;
};

export type UpdatePlayerInput = Partial<CreatePlayerInput>;

type CreatePlayerResult = {
  insert_players_one: {
    id: string;
    name: string;
    position: string | null;
    nationality: string | null;
    birth_date: string | null;
    current_club_id: string | null;
  };
};

const CREATE_PLAYER_MUTATION = requireOperationText(
  getRequest(CreatePlayerMutation).params.text,
  "CreatePlayerMutation",
);

export async function createPlayer(input: CreatePlayerInput) {
  const data = await hasuraFetch<CreatePlayerResult>(CREATE_PLAYER_MUTATION, {
    object: input,
  });
  return data.insert_players_one;
}

type GetPlayersResult = {
  players: Array<{
    id: string;
    name: string;
    position: string | null;
    nationality: string | null;
    birth_date: string | null;
    club?: { id: string; name: string } | null;
  }>;
  players_aggregate?: {
    aggregate?: {
      count: number;
    } | null;
  } | null;
};

type PlayerDetailResult = {
  players_by_pk: {
    id: string;
    name: string;
    position: string | null;
    nationality: string | null;
    birth_date: string | null;
    created_at: string;
    updated_at: string;
    club: { id: string; name: string } | null;
    contracts: unknown[];
    transfers: unknown[];
    stats: unknown[];
  } | null;
};

type UpdatePlayerResult = {
  update_players_by_pk: {
    id: string;
    name: string;
    position: string | null;
    nationality: string | null;
    birth_date: string | null;
    current_club_id: string | null;
    updated_at: string;
  } | null;
};

type DeletePlayerResult = {
  delete_players_by_pk: {
    id: string;
  } | null;
};

const PLAYERS_QUERY = requireOperationText(
  getRequest(PlayersListQuery).params.text,
  "PlayersListQuery",
);
const PLAYER_DETAIL_QUERY = requireOperationText(
  getRequest(PlayerDetailQuery).params.text,
  "PlayerDetailQuery",
);
const UPDATE_PLAYER_MUTATION = requireOperationText(
  getRequest(UpdatePlayerMutation).params.text,
  "UpdatePlayerMutation",
);
const DELETE_PLAYER_MUTATION = requireOperationText(
  getRequest(DeletePlayerMutation).params.text,
  "DeletePlayerMutation",
);

export async function getPlayers(opts?: {
  limit?: number;
  offset?: number;
  search?: string;
  position?: string;
}) {
  const { limit = 100, offset = 0, search, position } = opts ?? {};
  const conditions: unknown[] = [];
  if (search) {
    conditions.push({
      _or: [
        { name: { _ilike: `%${search}%` } },
        { nationality: { _ilike: `%${search}%` } },
      ],
    });
  }
  if (position) {
    conditions.push({ position: { _eq: position } });
  }
  const where =
    conditions.length > 0
      ? conditions.length === 1
        ? conditions[0]
        : { _and: conditions }
      : null;

  const data = await hasuraFetch<GetPlayersResult>(PLAYERS_QUERY, {
    limit,
    offset,
    where,
    order_by: [{ name: "asc" }],
  });
  return data.players;
}

export async function getPlayerById(id: string) {
  const data = await hasuraFetch<PlayerDetailResult>(PLAYER_DETAIL_QUERY, { id });
  return data.players_by_pk;
}

export async function updatePlayer(id: string, set: UpdatePlayerInput) {
  const data = await hasuraFetch<UpdatePlayerResult>(UPDATE_PLAYER_MUTATION, {
    id,
    set,
  });
  return data.update_players_by_pk;
}

export async function deletePlayer(id: string) {
  const data = await hasuraFetch<DeletePlayerResult>(DELETE_PLAYER_MUTATION, {
    id,
  });
  return data.delete_players_by_pk;
}
