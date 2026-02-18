import { graphql } from "react-relay";

export const CreatePlayerMutation = graphql`
  mutation CreatePlayerMutation($object: players_insert_input!) {
    insert_players_one(object: $object) {
      id
      name
      position
      nationality
      birth_date
      current_club_id
    }
  }
`;
