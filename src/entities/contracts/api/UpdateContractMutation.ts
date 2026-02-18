import { graphql } from "react-relay";

export const UpdateContractMutation = graphql`
  mutation UpdateContractMutation($id: uuid!, $set: contracts_set_input!) {
    update_contracts_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      start_date
      end_date
      salary
      clause
      updated_at
    }
  }
`;
