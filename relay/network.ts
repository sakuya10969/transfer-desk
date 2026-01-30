import type {
  Variables,
  RequestParameters,
  GraphQLResponse,
} from "relay-runtime";

export const fetchGraphQL = async (
  params: RequestParameters,
  variables: Variables
): Promise<GraphQLResponse> => {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  return (await res.json()) as GraphQLResponse;
};
