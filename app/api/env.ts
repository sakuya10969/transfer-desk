export const getHasuraEnv = (): { url: string; adminSecret: string } => {
    const url = process.env.HASURA_GRAPHQL_URL;
    const adminSecret = process.env.HASURA_ADMIN_SECRET;
  
    if (!url || !adminSecret) {
      throw new Error("Missing env: HASURA_GRAPHQL_URL / HASURA_ADMIN_SECRET");
    }
  
    return { url, adminSecret };
  }
  