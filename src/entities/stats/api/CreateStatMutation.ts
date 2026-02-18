import { graphql } from "react-relay";

export const CreateStatMutation = graphql`
  mutation CreateStatMutation($object: stats_insert_input!) {
    insert_stats_one(object: $object) {
      id
      season
      player_id
      club_id
      matches
      goals
      assists
    }
  }
`;
