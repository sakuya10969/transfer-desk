import { graphql } from "react-relay";

export const UpdateTransferMutation = graphql`
  mutation UpdateTransferMutation($id: uuid!, $set: transfers_set_input!) {
    update_transfers_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      transfer_year
      transfer_month
      type
      fee
      loan_end_year
      loan_end_month
    }
  }
`;
