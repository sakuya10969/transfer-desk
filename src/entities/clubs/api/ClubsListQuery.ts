import { graphql } from "react-relay";

export const ClubsListQuery = graphql`
  query ClubsListQuery(
    $limit: Int!
    $offset: Int!
    $where: clubs_bool_exp
    $order_by: [clubs_order_by!]
  ) {
    clubs(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
      id
      name
      country
      league
      founded_year
      stadium
    }
    clubs_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
