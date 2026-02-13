import { graphql } from "react-relay";

export const TransferDetailQuery = graphql`
  query TransferDetailQuery($id: uuid!) {
    transfers_by_pk(id: $id) {
      id
      transfer_year
      transfer_month
      type
      fee
      loan_end_year
      loan_end_month
      created_at
      player {
        id
        name
      }
      club {
        id
        name
      }
      clubByToClubId {
        id
        name
      }
    }
  }
`;
