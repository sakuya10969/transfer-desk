import { NextResponse } from "next/server";
import { z } from "zod";

import { createClub } from "@/app/api/clubs";
import { HasuraRequestError } from "@/app/api/hasuraClient";

const CreateClubSchema = z.object({
  name: z.string().min(1).max(80),
  country: z.string().max(80).optional().or(z.literal("")),
  league: z.string().max(80).optional().or(z.literal("")),
  foundedYear: z.coerce.number().int().min(1800).max(2100).optional(),
  stadium: z.string().max(120).optional().or(z.literal("")),
});

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as unknown;
    const input = CreateClubSchema.parse(body);

    const club = await createClub({
      name: input.name,
      country: input.country || null,
      league: input.league || null,
      founded_year: input.foundedYear ?? null,
      stadium: input.stadium || null,
    });

    return NextResponse.json({ club }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", details: e.flatten() },
        { status: 422 }
      );
    }

    if (e instanceof HasuraRequestError) {
      return NextResponse.json(
        { message: e.message, details: e.errors ?? null },
        { status: e.status ?? 400 }
      );
    }

    return NextResponse.json(
      { message: "Unexpected error", details: String(e) },
      { status: 500 }
    );
  }
};
