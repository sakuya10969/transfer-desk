import { graphql } from "react-relay";

export const ContractDetailQuery = graphql`
  query ContractDetailQuery($id: uuid!) {
    contracts_by_pk(id: $id) {
      id
      start_date
      end_date
      salary
      clause
      created_at
      updated_at
      player {
        id
        name
      }
      club {
        id
        name
      }
    }
  }
`;
