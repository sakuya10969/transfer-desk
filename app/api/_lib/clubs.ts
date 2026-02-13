import { hasuraFetch } from "@/app/api/_lib/hasuraClient";

export type CreateClubInput = {
  name: string;
  country: string | null;
  league: string | null;
  founded_year: number | null;
  stadium: string | null;
};

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

const CREATE_CLUB_MUTATION = `
  mutation CreateClub($object: clubs_insert_input!) {
    insert_clubs_one(object: $object) {
      id
      name
      country
      league
      founded_year
      stadium
    }
  }
`;

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
};

const CLUBS_QUERY = `
  query GetClubs($limit: Int, $offset: Int, $where: clubs_bool_exp) {
    clubs(limit: $limit, offset: $offset, where: $where, order_by: [{ name: asc }]) {
      id
      name
      country
      league
      founded_year
      stadium
    }
  }
`;

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
  });
  return data.clubs;
}
