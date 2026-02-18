import { graphql } from "react-relay";

export const PlayersListQuery = graphql`
  query PlayersListQuery(
    $limit: Int!
    $offset: Int!
    $where: players_bool_exp
    $order_by: [players_order_by!]
  ) {
    players(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      name
      position
      nationality
      birth_date
      club {
        id
        name
      }
    }
    players_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
