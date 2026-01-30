import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT;
  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

  if (!endpoint) {
    return NextResponse.json(
      { message: "HASURA_GRAPHQL_ENDPOINT is not set" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
    },
    body,
    cache: "no-store",
  });

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: {
      "content-type": "application/json",
    },
  });
}
