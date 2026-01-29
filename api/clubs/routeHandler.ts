import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const CreateClubSchema = z.object({
  name: z.string().min(1).max(80),
  country: z.string().max(80).optional().or(z.literal("")),
  league: z.string().max(80).optional().or(z.literal("")),
  foundedYear: z.coerce.number().int().min(1800).max(2100).optional(),
  stadium: z.string().max(120).optional().or(z.literal("")),
});

type CreateClubInput = z.infer<typeof CreateClubSchema>;

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as unknown;
    const input = CreateClubSchema.parse(body);

    const url = process.env.HASURA_GRAPHQL_URL;
    const adminSecret = process.env.HASURA_ADMIN_SECRET;
    if (!url || !adminSecret) {
      return NextResponse.json(
        { message: "Server env is missing (HASURA_GRAPHQL_URL / HASURA_ADMIN_SECRET)." },
        { status: 500 }
      );
    }

    // Hasura auto-generated mutation
    const query = `
      mutation InsertClub($object: clubs_insert_input!) {
        insert_clubs_one(object: $object) {
          id
          name
        }
      }
    `;

    const object = {
      name: input.name,
      country: input.country || null,
      league: input.league || null,
      founded_year: input.foundedYear ?? null,
      stadium: input.stadium || null,
    };

    const res = await axios.post(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": adminSecret,
      },
      data: { query, variables: { object } },
    });

    const json = res.data;

    if (!res.status || json.errors) {
      throw new Error("Hasura error");
    }

    return NextResponse.json({ club: json.data.insert_clubs_one }, { status: res.status });
  } catch (e) {
    throw new Error("Unexpected error");
  }
}
