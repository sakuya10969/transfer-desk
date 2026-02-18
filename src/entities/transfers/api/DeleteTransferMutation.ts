import { graphql } from "react-relay";

export const DeleteTransferMutation = graphql`
  mutation DeleteTransferMutation($id: uuid!) {
    delete_transfers_by_pk(id: $id) {
      id
    }
  }
`;
