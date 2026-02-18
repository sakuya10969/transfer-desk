export class HasuraRequestError extends Error {
  status?: number;
  errors?: unknown;

  constructor(message: string, opts?: { status?: number; errors?: unknown }) {
    super(message);
    this.name = "HasuraRequestError";
    this.status = opts?.status;
    this.errors = opts?.errors;
  }
}

type HasuraResponse<T> =
  | { data: T; errors?: undefined }
  | { data?: undefined; errors: unknown };

export const hasuraFetch = async <TData>(
  query: string,
  variables: Record<string, unknown> = {},
  options?: { headers?: HeadersInit }
): Promise<TData> => {
  const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT;
  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

  if (!endpoint) throw new Error("HASURA_GRAPHQL_ENDPOINT is not set");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as HasuraResponse<TData>;

  if (!res.ok) {
    throw new HasuraRequestError("Hasura request failed", {
      status: res.status,
      errors: (json as any)?.errors ?? null,
    });
  }

  if ("errors" in json && json.errors) {
    throw new HasuraRequestError("Hasura GraphQL error", {
      status: res.status,
      errors: json.errors,
    });
  }

  if (!("data" in json) || json.data === undefined) {
    throw new HasuraRequestError("Hasura response has no data", {
      status: res.status,
      errors: null,
    });
  }

  return json.data;
};
