import { hasuraFetch } from "@/app/api/_lib/hasuraClient";

export type CreatePlayerInput = {
  name: string;
  position?: string | null;
  nationality?: string | null;
  birth_date?: string | null;
  current_club_id?: string | null;
};

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

const CREATE_PLAYER_MUTATION = `
  mutation CreatePlayer($object: players_insert_input!) {
    insert_players_one(object: $object) {
      id
      name
      position
      nationality
      birth_date
      current_club_id
    }
  }
`;

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
    current_club_id: string | null;
    current_club?: { id: string; name: string } | null;
  }>;
};

const PLAYERS_QUERY = `
  query GetPlayers($limit: Int, $offset: Int, $where: players_bool_exp) {
    players(limit: $limit, offset: $offset, where: $where, order_by: [{ name: asc }]) {
      id
      name
      position
      nationality
      birth_date
      current_club_id
      current_club {
        id
        name
      }
    }
  }
`;

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
  });
  return data.players;
}
