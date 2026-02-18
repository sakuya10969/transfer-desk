import { graphql } from "react-relay";

export const CreateTransferMutation = graphql`
  mutation CreateTransferMutation($object: transfers_insert_input!) {
    insert_transfers_one(object: $object) {
      id
      player_id
      from_club_id
      to_club_id
      transfer_year
      transfer_month
      type
      fee
    }
  }
`;
