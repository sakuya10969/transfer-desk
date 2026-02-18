import { graphql } from "react-relay";

export const StatsListQuery = graphql`
  query StatsListQuery(
    $limit: Int!
    $offset: Int!
    $where: stats_bool_exp
    $order_by: [stats_order_by!]
  ) {
    stats(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      season
      matches
      goals
      assists
      player {
        id
        name
      }
      club {
        id
        name
      }
    }
    stats_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
