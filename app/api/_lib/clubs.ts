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
