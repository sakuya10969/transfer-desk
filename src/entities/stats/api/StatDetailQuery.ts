import { graphql } from "react-relay";

export const StatDetailQuery = graphql`
  query StatDetailQuery($id: uuid!) {
    stats_by_pk(id: $id) {
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
  }
`;
