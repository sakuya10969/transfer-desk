import { hasuraRequest } from "@/app/api/hasuraClient";

type InsertClubVars = {
  object: {
    name: string;
    country: string | null;
    league: string | null;
    founded_year: number | null;
    stadium: string | null;
  };
};

type InsertClubData = {
  insert_clubs_one: {
    id: string;
    name: string;
  } | null;
};

const InsertClubMutation = `
  mutation InsertClub($object: clubs_insert_input!) {
    insert_clubs_one(object: $object) {
      id
      name
    }
  }
`;

export const createClub = async (input: InsertClubVars["object"]) => {
  const data = await hasuraRequest<InsertClubData, InsertClubVars>({
    query: InsertClubMutation,
    variables: { object: input },
  });

  if (!data.insert_clubs_one) {
    throw new Error("Insert failed: insert_clubs_one is null");
  }

  return data.insert_clubs_one;
};
