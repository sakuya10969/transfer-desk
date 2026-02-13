import { graphql } from "react-relay";

export const DeleteContractMutation = graphql`
  mutation DeleteContractMutation($id: uuid!) {
    delete_contracts_by_pk(id: $id) {
      id
    }
  }
`;
