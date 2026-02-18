import { graphql } from "react-relay";

export const ClubsForSelectQuery = graphql`
  query ClubsForSelectQuery {
    clubs(order_by: [{ name: asc }]) {
      id
      name
    }
  }
`;
