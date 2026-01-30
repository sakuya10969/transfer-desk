import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { fetchGraphQL } from "@/relay/network";

export const createRelayEnvironment = () => {
  return new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
  });
};
