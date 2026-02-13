import { graphql } from "react-relay";

export const ContractsListQuery = graphql`
  query ContractsListQuery(
    $limit: Int!
    $offset: Int!
    $where: contracts_bool_exp
    $order_by: [contracts_order_by!]
  ) {
    contracts(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      start_date
      end_date
      salary
      clause
      player {
        id
        name
      }
      club {
        id
        name
      }
    }
    contracts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
