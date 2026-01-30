import { getHasuraEnv } from "@/app/api/env";

type GraphQLError = { message: string; extensions?: unknown };

export class HasuraRequestError extends Error {
  constructor(
    message: string,
    public readonly errors?: GraphQLError[],
    public readonly status?: number,
  ) {
    super(message);
    this.name = "HasuraRequestError";
  }
}

export const hasuraRequest = async <
  TData,
  TVariables extends Record<string, unknown> | undefined,
>(args: {
  query: string;
  variables?: TVariables;
  headers?: Record<string, string>;
}): Promise<TData> => {
  const { url, adminSecret } = getHasuraEnv();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": adminSecret,
      ...args.headers,
    },
    body: JSON.stringify({
      query: args.query,
      variables: args.variables ?? undefined,
    }),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as {
    data?: TData;
    errors?: GraphQLError[];
  } | null;

  if (!res.ok) {
    throw new HasuraRequestError(
      "Hasura request failed",
      json?.errors,
      res.status,
    );
  }

  if (!json || json.errors) {
    throw new HasuraRequestError(
      "Hasura returned GraphQL errors",
      json?.errors,
      res.status,
    );
  }

  if (!json.data) {
    throw new HasuraRequestError(
      "Hasura returned empty data",
      undefined,
      res.status,
    );
  }

  return json.data;
};
