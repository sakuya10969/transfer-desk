import { graphql } from "react-relay";

export const CreateContractMutation = graphql`
  mutation CreateContractMutation($object: contracts_insert_input!) {
    insert_contracts_one(object: $object) {
      id
      player_id
      club_id
      start_date
      end_date
      salary
      clause
    }
  }
`;
