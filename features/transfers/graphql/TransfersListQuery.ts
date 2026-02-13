import { graphql } from "react-relay";

export const TransfersListQuery = graphql`
  query TransfersListQuery(
    $limit: Int!
    $offset: Int!
    $where: transfers_bool_exp
    $order_by: [transfers_order_by!]
  ) {
    transfers(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      transfer_year
      transfer_month
      type
      fee
      player {
        id
        name
      }
      from_club {
        id
        name
      }
      to_club {
        id
        name
      }
    }
    transfers_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
