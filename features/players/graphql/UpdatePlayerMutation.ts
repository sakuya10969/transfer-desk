import { graphql } from "react-relay";

export const UpdatePlayerMutation = graphql`
  mutation UpdatePlayerMutation($id: uuid!, $set: players_set_input!) {
    update_players_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
      name
      position
      nationality
      birth_date
      current_club_id
      updated_at
    }
  }
`;
